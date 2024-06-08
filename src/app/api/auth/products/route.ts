import fs from "node:fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Products } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { extname, join } from "path";
import { format } from "date-fns";
import { stat, mkdir, writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { log } from "node:console";
function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
}

interface TProcuctPut extends Omit<Products, "code" | "video" | "images"> {
  code?: string | undefined;
  video?: string | null;
  images?: string | null;
}
export async function GET(req: NextRequest, res: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "You must be logged in." });
  }
  return NextResponse.json({ message: "124" });
}
export async function POST(req: NextRequest, res: NextApiRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "You must be logged in." });
  }
  /**------------------ */
  const data = await req.formData();
  const image = data.get("image") as unknown as File;
  const video = data.get("video") as unknown as File;
  if (!image && !video) {
    return NextResponse.json({ error: "File  is required." }, { status: 400 });
  }
  const buffer = Buffer.from(await image.arrayBuffer());
  const buffer_video = Buffer.from(await video.arrayBuffer());
  /**------------- */
  const pathDist: string = join(process.cwd(), "/public/images");
  const pathDist_video: string = join(process.cwd(), "/public/videos");
  /**------------- */
  const relativeUploadDir = `${format(Date.now(), "yyyy-MM-dd")}`;
  /**------------- */
  const uploadDir = join(pathDist, relativeUploadDir);
  const uploadDir_video = join(pathDist_video, relativeUploadDir);

  try {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;

    const fileExtension = extname(image.name);
    const fileExtension_video = extname(video.name);

    const originalFilename = image.name.replace(/\.[^/.]+$/, "");
    const originalFilename_video = video.name.replace(/\.[^/.]+$/, "");

    const sanitizedFilename = sanitizeFilename(originalFilename);
    const sanitizedFilename_video = sanitizeFilename(originalFilename_video);

    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
    const filename_video = `${sanitizedFilename_video}_${uniqueSuffix}${fileExtension_video}`;

    await mkdir(uploadDir, { recursive: true });
    await mkdir(uploadDir_video, { recursive: true });
    await writeFile(`${uploadDir}/${filename}`, buffer);
    await writeFile(`${uploadDir_video}/${filename_video}`, buffer_video);
    const finalFilePath =
      `${req.headers.get("origin")}/images/` +
      `${relativeUploadDir}/${filename}`;
    const finalFilePath_video =
      `${req.headers.get("origin")}/videos/` +
      `${relativeUploadDir}/${filename_video}`;
    if (data) {
      const arr_images: any[] = [];
      arr_images.push(finalFilePath);
      const data_product: Products | null = {
        code: uuidv4(),
        name: data.get("name_product")?.toString() || "",
        images: JSON.stringify(arr_images),
        product_type: data.get("product_type")?.toString() || "",
        rating: 0,
        price: Number(data.get("price")),
        discount: Number(data.get("discount")),
        description: data.get("product_info")?.toString() || "",
        quantity: Number(data.get("quantity")),
        video: finalFilePath_video.toString() || "",
        group: data.get("group_product")?.toString() || "",
        is_show: Boolean(data.get("status")),
        createdAt: new Date(),
        updatedAt: new Date(),
        sold: 0,
      };
      const result = await db.products.create({
        data: data_product,
      });
      if (result) {
        return NextResponse.json({
          message: "Tạo sản phẩm thành công",
          data: result,
        });
      }
    } else {
      return NextResponse.json(
        { message: "Tạo sản phẩm thất bại" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "You must be logged in." });
    }
    if (!req.nextUrl.searchParams.get("code")) {
      return NextResponse.json(
        {
          message: "Not found product by code",
        },
        { status: 400 }
      );
    }
    const data = await req.formData();
    if (!data) {
      return NextResponse.json(
        {
          message: "Not found data update",
        },
        { status: 400 }
      );
    }
    let image = data.get("image");
    let video = data.get("video");
    /**------------- */
    const pathDist: string = join(process.cwd(), "/public/images");
    const pathDist_video: string = join(process.cwd(), "/public/videos");
    /**------------- */
    const relativeUploadDir = `${format(Date.now(), "yyyy-MM-dd")}`;
    /**------------- */
    const uploadDir = join(pathDist, relativeUploadDir);
    const uploadDir_video = join(pathDist_video, relativeUploadDir);
    let finalFilePath = null;
    let finalFilePath_video = null;
    let result_image = false;
    let data_product: TProcuctPut | null = null;
    let result_video = false;
    try {
      if (image !== "none") {
        try {
          image = data.get("image") as unknown as File;
          const buffer = Buffer.from(await image.arrayBuffer());
          const uniqueSuffix = `${Date.now()}_${Math.round(
            Math.random() * 1e9
          )}`;

          const fileExtension = extname(image.name);

          const originalFilename = image.name.replace(/\.[^/.]+$/, "");

          const sanitizedFilename = sanitizeFilename(originalFilename);

          const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;

          await mkdir(uploadDir, { recursive: true });
          await mkdir(uploadDir_video, { recursive: true });
          await writeFile(`${uploadDir}/${filename}`, buffer);
          finalFilePath =
            `${req.headers.get("origin")}/images/` +
            `${relativeUploadDir}/${filename}`;
          result_image = true;
        } catch (error) {
          result_image = false;
        }
      }
      if (video !== "none") {
        try {
          video = data.get("video") as unknown as File;
          const buffer_video = Buffer.from(await video.arrayBuffer());
          const uniqueSuffix = `${Date.now()}_${Math.round(
            Math.random() * 1e9
          )}`;

          const fileExtension_video = extname(video.name);
          const originalFilename_video = video.name.replace(/\.[^/.]+$/, "");
          const sanitizedFilename_video = sanitizeFilename(
            originalFilename_video
          );

          const filename_video = `${sanitizedFilename_video}_${uniqueSuffix}${fileExtension_video}`;
          await mkdir(uploadDir_video, { recursive: true });
          await writeFile(`${uploadDir_video}/${filename_video}`, buffer_video);
          finalFilePath_video =
            `${req.headers.get("origin")}/videos/` +
            `${relativeUploadDir}/${filename_video}`;
          result_video = true;
        } catch (error) {
          result_video = false;
        }
      }
      data_product = {
        name: data.get("name_product")?.toString() || "",
        product_type: data.get("product_type")?.toString() || "",
        rating: 0,
        price: Number(data.get("price")),
        discount: Number(data.get("discount")),
        description: data.get("product_info")?.toString() || "",
        quantity: Number(data.get("quantity")),
        group: data.get("group_product")?.toString() || "",
        is_show: Boolean(data.get("status")),
        createdAt: new Date(),
        updatedAt: new Date(),
        sold: 0,
      };
      if (!data_product) {
        return NextResponse.json(
          {
            message: "Not found data update",
          },
          { status: 400 }
        );
      }
      if (result_image) {
        const arr_images: any[] = [];
        data_product = {
          ...data_product,
          images: JSON.stringify(arr_images),
          video: null,
        };
      }
      if (result_video) {
        data_product = {
          ...data_product,
          video: finalFilePath_video,
        };
      }
      const result = await db.products.update({
        data: data_product,
        where: {
          code: req.nextUrl.searchParams.get("code")?.toString(),
        },
      });
      if (result) {
        return NextResponse.json({
          message: "Cập nhật sản phẩm thành công",
          product: result,
        });
      } else {
        return NextResponse.json({
          message: "Cập nhật sản phẩm thất bại",
          product: result,
        });
      }
    } catch (error) {
      return NextResponse.json(
        {
          message: "Interal Throw Error",
          product: 500,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "ok" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Interal Throw Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "You must be logged in." });
    }
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
      return NextResponse.json(
        {
          message: "Not found product by code",
        },
        { status: 400 }
      );
    }

    try {
      const result = await db.products.delete({
        where: {
          code: code,
        },
      });
      if (result) {
        return NextResponse.json(
          {
            message: "Xoá sản phẩm thành công",
            product: result,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            message: "Xoá sản phẩm không thành công",
            product: result,
          },
          { status: 400 }
        );
      }
    } catch (error) {}
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Throw Error",
      },
      { status: 500 }
    );
  }
}
