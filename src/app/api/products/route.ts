import { NextRequest, NextResponse } from "next/server";
import { queryProducts, createProductPage, notionPageToProduct } from "@/lib/notionClient";

/**
 * GET /api/products
 * Returns all approved marketplace products.
 */
export async function GET(request: NextRequest) {
  try {
    // Filter: Status = 'approved'
    const filter: any = {
      property: "Status",
      select: { equals: "approved" },
    };

    const results = await queryProducts(filter);

    const products = results.map(page => notionPageToProduct(page));

    return NextResponse.json({
      products,
      total: products.length,
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * Create a new marketplace product (draft or directly approved).
 * Requires Authorization: Bearer <HANS_API_KEY>
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedKey = process.env.HANS_API_KEY;
  if (!expectedKey || !authHeader || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, category, price, image, gradient, status = 'pending' } = body;

    if (!title || !price) {
      return NextResponse.json(
        { error: "Missing required fields: title, price" },
        { status: 400 }
      );
    }

    const notionStatus = status === 'approved' ? 'approved' : 'pending';

    const properties: any = {
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
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product", details: error.message }, { status: 500 });
  }
}
