"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { CardProduct } from "./card-product";
import { SkeletonProduct } from "./skeleton-product";
import { Products } from "@prisma/client";
import { requestServices } from "@/utils/request-services";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface IProductAll {
  product_all_type: "all" | "mat-ong" | "combo-uu-dai" | "find";
}
interface IProducts {
  data: Products[] | null;
  count: number;
}
export const ProductAll = ({ product_all_type }: IProductAll) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams || "");
  const [products, setProducts] = useState<IProducts>({ data: [], count: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();
  const pageNum = Number(searchParams?.get("page")) || 1;
  const totalPages = Math.ceil(products?.count / 20);
  useEffect(() => {
    try {
      const getFindProduct = async () => {
        try {
          let queryProductFind = ``;
          if (product_all_type === "find") {
            queryProductFind = `/products?${params.get("q")}`;
          } else if (product_all_type === "mat-ong") {
            queryProductFind = `/products?group=mat-ong`;
          } else if (product_all_type === "combo-uu-dai") {
            queryProductFind = `/products?group=combo-uu-dai`;
          } else if (product_all_type === "all") {
            queryProductFind = `/products`;
          }
          queryProductFind += `?page=${searchParams?.get("page") || 1}`;
          const { data } = await requestServices.get(queryProductFind);
          if (data && data.products.length > 0) {
            setProducts({
              data: data.products,
              count: data.count,
            });
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      getFindProduct();
    } catch (error) {
      setLoading(false);
    }
  }, [searchParams]);
  const setPageParams = (page: number) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <div className="grid lg:grid-cols-[repeat(5,minmax(100px,250px))] md:grid-cols-[repeat(4,minmax(100px,250px))] sm:grid-cols-[repeat(3,minmax(100px,250px))] gap-4">
            <SkeletonProduct />

            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
          </div>
        </>
      ) : (
        <>
          {products ? (
            <div className="grid lg:grid-cols-[repeat(5,minmax(100px,250px))] md:grid-cols-[repeat(4,minmax(100px,250px))] sm:grid-cols-[repeat(3,minmax(100px,250px))] gap-4">
              {products.data &&
                products.data.map((item) => {
                  return <CardProduct {...item} key={item.code} />;
                })}
            </div>
          ) : (
            <div className="text-center">KHÔNG CÓ SẢN PHẨM NÀO</div>
          )}
          <div>
            {products.data && products.data.length > 0 && totalPages !== 1 && (
              <Pagination className="justify-end">
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious
                      onClick={() => {
                        if (pageNum === 1) return;
                        setPageParams(pageNum - 1);
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem
                    className="cursor-pointer"
                    onClick={() => {
                      if (pageNum >= totalPages) return;
                      setPageParams(pageNum + 1);
                    }}
                  >
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}
    </>
  );
};
