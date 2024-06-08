import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Orders, Products } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// interface IOrderResult extends Orders {}
export async function GET(req: NextRequest, res: any) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "You must be logged in." });
    }
    const page = Number(searchParams.get("page") || 1);
    const search = searchParams.get("code");
    const result = await db.orders.findMany({
      orderBy: {
        createdAt: "asc",
      },
      skip: (page - 1) * 10,
      take: 10,
      where: {
        code: {
          contains: search?.toString() || "",
        },
      },
    });
    const count = await db.orders.count({
      where: {
        code: {
          contains: search?.toString() || "",
        },
      },
    });
    if (!result) {
      return NextResponse.json({ message: "Not orders" }, { status: 400 });
    }
    let code_product: { code: string; product_code: any[] }[] | null = [];
    result.map((item) => {
      if (item.products) {
        code_product.push({
          code: item.code,
          product_code: item.products,
        });
      }
    });
    if (code_product) {
      let data_s: any[] = [];
      result.map((item) => {
        data_s.push(item.products);
      });
      let a: any[] = [];
      // data_s.flat().map((item) => {
      //   a.push(item.code_product);
      //   console.log(a);
      // });
      let result_product: any[] = [];
      // if (result[j].code === data_s.flat()[i].code_order) {
      data_s.flat().map((item) => {});
      for (let i = 0; i < data_s.flat().length; i++) {
        result_product = await db.products.findMany({
          where: {
            code: data_s.flat()[i].code_product,
          },
        });
        if (result_product) {
          result_product[0] = Object.assign({}, result_product[0], {
            quantity_cart: data_s.flat()[i].quantity,
          });
        }
        a.push({
          code_order: data_s.flat()[i].code_order,
          product: result_product,
          // quantity: data_s.flat()[i].quantity,
        });
      }
      const result_x = a.reduce((obj, item) => {
        obj[item.code_order]
          ? obj[item.code_order].product.push(...item.product)
          : (obj[item.code_order] = {
              ...item,
            });
        return obj;
      }, {});
      let x: any[] = [];
      Object.values(result_x).map((item: any, key) => {
        if (item.code_order === result[key].code) {
          x.push(Object.assign({}, item, result[key]));
        }
      });
      return NextResponse.json({ orders: x, count });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Throw Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formOrder = await req.formData();
    if (!formOrder) {
      return NextResponse.json(
        { message: "Not found form order" },
        { status: 400 }
      );
    }
    const data_order: Orders = {
      code: formOrder.get("code")?.toString() || "",
      fullName: formOrder.get("full_name")?.toString() || "",
      email: formOrder.get("mail")?.toString() || "Không có",
      phone: Number(formOrder.get("phone")?.toString()),
      address: formOrder.get("address")?.toString() || "",
      quantity: Number(formOrder.get("quantity") || 0),
      products: JSON.parse(formOrder.get("products")?.toString() || "[]"),
      total_price: Number(formOrder.get("total_price")),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.orders.create({
      data: {
        ...data_order,
        products: JSON.parse(formOrder.get("products")?.toString() || "[]"),
      },
    });
    if (result) {
      return NextResponse.json({ message: "Thành công" });
    } else {
      return NextResponse.json(
        { message: "Không thành công" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Throw Error" },
      { status: 400 }
    );
  }
}
