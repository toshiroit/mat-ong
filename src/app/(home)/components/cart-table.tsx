"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { CartProduct } from "./cart-product";
import { UseModal } from "@/app/hooks/use-modal";
import { ModalDialog } from "./modal-dialog";

import { ModalDialogOrder } from "./modal-dialog-order";
import { useEffect, useState } from "react";
import { Products } from "@prisma/client";
import { localStorageDB, mergeArrays } from "@/lib/utils";
import { requestServices } from "@/utils/request-services";
import { LoadingSpinner } from "./loading-1";
import { TCartData } from "./product";

export type TCart = TCartData & {
  cart_data: Products;
};
export const CartTable = () => {
  const [dataCart, setDataCart] = useState<TCart[] | null>(null);
  const [remove, setRemove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    let dataCartLocal = JSON.parse(
      localStorageDB({
        status: "GET",
        name: "cart",
      })
    ) as TCartData[];
    if (dataCartLocal) {
      let codeDataCart: string[] = [];
      dataCartLocal.map((item) => {
        codeDataCart.push(item.code_cart);
      });
      const getProductCart = async () => {
        setLoading(true);
        const { data } = await requestServices.get(
          `/products?cart=${JSON.stringify(codeDataCart)}`
        );
        if (data.products) {
          const a3 = dataCartLocal.map((it1: any) => {
            it1.cart_data = data.products.find(
              (it2: any) => it2.code === it1.code_cart
            );
            if (!it1.cart_data) {
              it1.cart_data = null;
            }
            return it1;
          });

          setDataCart(a3);
        } else {
          setDataCart([]);
        }
        setLoading(false);
      };
      getProductCart();
    } else {
      // setDataCart(null);
    }
  }, [remove]);
  const onRemove = (code: string) => {
    const dataCart =
      (JSON.parse(
        localStorageDB({ name: "cart", status: "GET" })
      ) as TCartData[]) || [];
    if (code && dataCart) {
      const data_result = dataCart.filter((i) => i.code_cart !== code);
      localStorageDB({
        status: "UPDATE",
        name: "cart",
        data: JSON.stringify(data_result),
      });
      setRemove(!remove);
    }
  };
  return (
    <>
      {loading ? (
        <>
          {" "}
          <LoadingSpinner />
        </>
      ) : !dataCart || dataCart.length === 0 ? (
        <div className="text-center text-2xl font-bold">
          KHÔNG CÓ SẢN PHẨM NÀO TRONG GIỎ HÀNG
        </div>
      ) : (
        <>
          <div>
            <UseModal />
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-4/6">Sản phẩm</TableHead>
                  <TableHead className="w-1/6">Số lượng</TableHead>
                  <TableHead className="w-1/6 text-end">Thành tiền</TableHead>
                  <TableHead className="w-1/6 text-end"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataCart &&
                  dataCart.map((item) => {
                    return (
                      <CartProduct
                        {...item}
                        key={item.code_cart}
                        onRemove={onRemove}
                      />
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-bold text-lg" colSpan={3}>
                    Tổng tiền
                  </TableCell>
                  <TableCell className="text-end text-lg"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-end text-lg">
                    <ModalDialog titleButton="Đặt hàng ngay">
                      <ModalDialogOrder data_product={dataCart} />
                    </ModalDialog>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </>
      )}
    </>
  );
};
