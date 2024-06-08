import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { JsonToArray, formatPriceVND, localStorageDB } from "@/lib/utils";
import { Products } from "@prisma/client";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TCartData } from "./product";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export const CartProduct = (
  data: TCartData & { cart_data: Products; onRemove: (code: string) => void }
) => {
  const [quantityCart, setQuantityCart] = useState<number>(data.quantity_cart);
  const [remove, setRemove] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const dataCart =
      (JSON.parse(
        localStorageDB({ name: "cart", status: "GET" })
      ) as TCartData[]) || [];
    if (data.cart_data?.code && dataCart) {
      let resultDataCart = dataCart.map((i) => {
        if (i.code_cart === data.cart_data.code) {
          return { ...i, quantity_cart: quantityCart };
        } else {
          return i;
        }
      });
      localStorageDB({
        status: "UPDATE",
        name: "cart",
        data: JSON.stringify(resultDataCart),
      });
    }
  }, [quantityCart]);
  useEffect(() => {}, []);
  const onQuantityCart = ({ type }: { type: "-" | "+" }) => {
    router.refresh();
    if (type == "+") {
      let value = quantityCart;
      if (data && data.cart_data)
        if (value < data.cart_data.quantity) {
          setQuantityCart((value += 1));
        }
    } else if (type == "-") {
      let value = quantityCart;
      if (value > 1) {
        if (data && data.cart_data) {
          setQuantityCart((value -= 1));
        }
      }
    }
  };
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-8">
          <Link
            href={`/product/${data.cart_data?.code}`}
            className="flex items-center gap-8"
          >
            <div className="relative w-[100px] h-[100px]">
              <Image
                src={JsonToArray(data.cart_data?.images || "")[0] || ""}
                fill
                className="object-cover"
                alt=""
              />
            </div>
            <div>
              <h5 className="text-lg text-gray-900 font-[500]">
                {data.cart_data?.name}
              </h5>
              <div className="text-gray-600 font-bold">
                {data.product_type_cart?.name}
              </div>
            </div>
          </Link>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => onQuantityCart({ type: "-" })}
            className="rounded-full w-8 h-8 p-0 bg-orange-600 hover:bg-orange-700"
          >
            <CircleMinus />
          </Button>
          <Input
            value={quantityCart}
            className="w-20 text-center font-bold outline-none focus-visible:ring-0"
          />
          <Button
            onClick={() => onQuantityCart({ type: "+" })}
            className="rounded-full w-8 h-8 p-0 bg-orange-600 hover:bg-orange-700"
          >
            <CirclePlus />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-end font-bold">
        {formatPriceVND(
          (data.cart_data?.price && data.cart_data?.price * quantityCart) || 0
        )}
      </TableCell>
      <TableCell className="text-end">
        <Trash2 onClick={() => data.onRemove(data.cart_data?.code)} />
      </TableCell>
    </TableRow>
  );
};
