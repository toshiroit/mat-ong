import { db } from "@/lib/db";
import { Products } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(
  res: NextResponse,
  { params }: { params: { productCode: string } }
) {
  try {
    const product = await db.products.findUnique({
      where: {
        code: params.productCode,
      },
    });
    if (!product) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
