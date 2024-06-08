import { db } from "@/lib/db";
import { Products } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
  res: NextResponse,
  { params }: { params: { code: string } }
) {
  try {
    const products = await db.products.findMany({
      where: {
        name: {
          contains: params.code,
        },
      },
    });
    if (!products) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.json({ products });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
