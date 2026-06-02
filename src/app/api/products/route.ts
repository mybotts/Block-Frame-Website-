import { NextRequest, NextResponse } from "next/server";
import { createProductPage, queryProducts, notionPageToProduct } from "@/lib/notionClient";
import { marketplaceProducts } from "@/lib/data";

type ProductRequestBody = {
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  image?: string;
  gradient?: string;
  status?: string;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

/**
 * GET /api/products
 * Returns approved products from Notion with local fallback.
 */
export async function GET() {
  let products = marketplaceProducts.slice();

  try {
    const notionPages = await queryProducts({ property: "Status", select: { does_not_equal: "archived" } });

    const mapped = notionPages
      .map((page) => notionPageToProduct(page))
      .filter((product): product is NonNullable<typeof product> => Boolean(product.id));

    if (mapped.length > 0) {
      const notionByTitle = new Map(mapped.map((product) => [product.title.toLowerCase(), product]));

      products = marketplaceProducts
        .slice()
        .map((product) => {
          const notionProduct = notionByTitle.get(product.title.toLowerCase());
          if (!notionProduct) return product;

          return {
            ...product,
            title: notionProduct.title || product.title,
            description: notionProduct.description || product.description,
            category: notionProduct.category || product.category,
            price: notionProduct.price || product.price,
            image: notionProduct.image || product.image,
            gradient: notionProduct.gradient || product.gradient,
          };
        });
    }
  } catch (error) {
    console.error("Notion product fetch failed:", error);
  }

  const response = NextResponse.json({
    products,
    total: products.length,
  });

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Surrogate-Control", "no-store");

  return response;
}

/**
 * POST /api/products
 * Create a new marketplace product (draft or directly approved).
 * Requires Authorization: Bearer ***
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedKey = process.env.PRODUCTS_WRITE_KEY || process.env.HANS_API_KEY;
  if (!expectedKey || !authHeader || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as ProductRequestBody;
    const { title, description, category, price, image, gradient, status = 'pending' } = body;

    if (!title || !price) {
      return NextResponse.json(
        { error: "Missing required fields: title, price" },
        { status: 400 }
      );
    }

    const notionStatus = status === 'approved' ? 'approved' : 'pending';

    const properties: Record<string, unknown> = {
      Title: { title: [{ text: { content: title } }] },
      Status: { select: { name: notionStatus } },
    };

    if (description) {
      properties.Description = { rich_text: [{ text: { content: description } }] };
    }
    if (category) {
      properties.Category = { rich_text: [{ text: { content: category } }] };
    }
    if (price) {
      properties.Price = { rich_text: [{ text: { content: price } }] };
    }
    if (image) {
      properties.Image = { url: image };
    }
    if (gradient) {
      properties.Gradient = { rich_text: [{ text: { content: gradient } }] };
    }

    const page = await createProductPage(properties);

    return NextResponse.json({ id: page.id, status: notionStatus }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product", details: getErrorMessage(error) }, { status: 500 });
  }
}
