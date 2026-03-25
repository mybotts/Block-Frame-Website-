import { NextRequest, NextResponse } from "next/server";
import { updatePage, notionPageToProduct } from "@/lib/notionClient";

/**
 * POST /api/admin/products/[id]/approve
 * Approves a pending marketplace product (admin only).
 * In production, this should be protected by admin authentication.
 * Called by Mission Control's Approvals tab.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const secret = request.headers.get("x-mission-control-secret");
  const expectedSecret = process.env.MISSION_CONTROL_WEBHOOK_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const properties = {
      Status: { select: { name: "approved" } },
    };

    await updatePage(id, properties);

    return NextResponse.json({
      message: "Product approved successfully",
      id,
    });
  } catch (error: any) {
    console.error("Error approving product:", error);
    return NextResponse.json(
      { error: "Failed to approve product", details: error.message },
      { status: 500 }
    );
  }
}
