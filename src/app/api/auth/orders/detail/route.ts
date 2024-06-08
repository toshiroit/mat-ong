import { db } from "@/lib/db";
import { Products } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: any) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const code = searchParams.get("code");
    let products: Products[] = [];
    if (!code || code.length <= 0) {
      return NextResponse.json({ message: "Not found code" });
    }
    const result = await db.orders.findUnique({
      where: {
        code: code,
      },
    });

    if (!result) {
      return NextResponse.json(
        { message: "Không thành công", order: null },
        { status: 400 }
      );
    }
    let code_product: any[] = [];
    result.products.map((item: any) => {
      if (item) {
        code_product.push(item.code_product);
      }
    });
    products = await db.products.findMany({
      where: {
        code: {
          in: code_product,
        },
      },
    });
    // console.log("product ", products);
    // console.log("orders", result);
    const x = result.products.reduce((acc: any, curr: any) => {
      acc[curr.code_product] = curr.quantity;
      return acc;
    }, {});
    let res = products.map((o) => ({ ...o, quantity_cart: x[o.code] }));
    return NextResponse.json({
      message: "ok",
      order: result,
      products: res,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Throw Error" },
      { status: 500 }
    );
  }
}
