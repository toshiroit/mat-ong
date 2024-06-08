import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);
  try {
    // const url = new URL(request.nextUrl);

    let products = null;
    let count: number = 0;
    if (searchParams.get("group")) {
      products = await db.products.findMany({
        where: {
          group: searchParams.get("group"),
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } else if (searchParams.get("cart")) {
      const value_params_cart = JSON.parse(
        searchParams.get("cart") || ""
      ) as string[];
      products = await db.products.findMany({
        where: {
          code: {
            in: value_params_cart,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } else {
      const page = Number(searchParams.get("page") || 1);
      const search = searchParams.get("q");
      products = await db.products.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * 1,
        take: 20,
        where: {
          name: {
            contains: search?.toString() || "",
          },
        },
      });
      count = await db.products.count({
        where: {
          name: {
            contains: search?.toString() || "",
          },
        },
      });
    }
    if (!products) {
      return NextResponse.json({ message: "No products", products: null });
    }
    if (products.length === 0) {
      return NextResponse.json({ message: "No products", products: null });
    }
    return NextResponse.json({ products: products, count: count });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
