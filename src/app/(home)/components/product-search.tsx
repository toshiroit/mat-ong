import { JsonToArray } from "@/lib/utils";
import { Products } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const ProductSearch = (data: Products) => {
  const onSearch = () => {
    return;
  };
  return (
    <Link href={`/product/${data.code}`} className="flex hover:bg-gray-100 p-4">
      <div className="relative w-[50px] h-[50px]">
        <Image
          src={JsonToArray(data.images || "")[0] || ""}
          alt="product"
          fill
          className="object-cover"
        />
      </div>
      <div className="ml-2">
        <h4 className="font-[500]">{data.name}</h4>
        <div>
          <span className="line-through text-gray-500">280.000đ</span>
          <span className="font-bold ml-2">{data.price}</span>
        </div>
      </div>
    </Link>
  );
};
