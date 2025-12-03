import { NextRequest, NextResponse } from "next/server";
import { updateRecord, getAllRecords, type ToolFields } from "@/lib/airtable";

const viewCache = new Map<string, number>();

setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of viewCache.entries()) {
    if (now - timestamp > 60 * 60 * 1000) {
      viewCache.delete(key);
    }
  }
}, 60 * 60 * 1000);

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  try {
    const { toolId } = await params;

    if (!toolId || !toolId.startsWith("rec")) {
      return NextResponse.json(
        { success: false, error: "Invalid tool ID" },
        { status: 400 }
      );
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";
    const cacheKey = `${ip}-${toolId}`;
    const lastView = viewCache.get(cacheKey);
    const now = Date.now();

    if (lastView && now - lastView < 60 * 60 * 1000) {
      return NextResponse.json(
        { success: true, message: "View already counted (rate limited)" },
        { status: 200 }
      );
    }

    viewCache.set(cacheKey, now);

    const toolsRecords = await getAllRecords<ToolFields>("TOOLS");
    const toolRecord = toolsRecords.find((record) => record.id === toolId);

    if (!toolRecord) {
      return NextResponse.json(
        { success: false, error: "Tool not found" },
        { status: 404 }
      );
    }

    const currentViews = toolRecord.fields.page_views || 0;

    await updateRecord("TOOLS", toolId, {
      page_views: currentViews + 1,
    });

    return NextResponse.json(
      {
        success: true,
        views: currentViews + 1,
        message: "View tracked successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("View tracking error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to track view" },
      { status: 500 }
    );
  }
}
