import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { JsonToArray, discountPrice, formatPriceVND } from "@/lib/utils";
import { Products } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export const CardProduct = (data: Products) => {
  return (
    <Link href={`/product/${data.code}`}>
      <Card className="shadow-none border-none rounded-none cursor-pointer">
        <CardContent className="p-0 group">
          <div className="relative w-full h-[300px] overflow-hidden ">
            <Image
              src={JsonToArray(data.images || "")[0] || ""}
              alt={data.name}
              fill
              className="object-cover group-hover:scale-110 z-10 absolute transition-all"
            />
          </div>
        </CardContent>
        <CardFooter className="py-3 px-0">
          <div className="flex flex-col">
            <div className="font-[500] text-sm">{data.name}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="line-through">{data.price}</div>
              <div className="font-[600]">
                Giá:{" "}
                {formatPriceVND(
                  discountPrice(data.price || 0, data.discount || 0)
                )}{" "}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
