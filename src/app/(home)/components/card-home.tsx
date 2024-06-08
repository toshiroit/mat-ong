"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SkeletonProduct } from "./skeleton-product";
import { db } from "@/lib/db";
import { Prisma, Products } from "@prisma/client";
import { requestServices } from "@/utils/request-services";
import { JsonToArray, discountPrice, formatPriceVND } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProducts {
  data: Products[] | null;
  count: number;
}
export const CardHome = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams || "");
  const [data, setData] = useState<IProducts>({ data: [], count: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(data?.count / 20);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await requestServices.get(`/products?page=${page}`);

        if (data) {
          setData({
            data: data.products,
            count: data.count,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);
  const setPageParams = (page: number) => {
    if (searchParams) {
      setPage(page);
    }
  };
  return (
    <div>
      <div className="">
        <div>
          <h1 className="text-2xl font-bold">Sản phẩm mới</h1>
        </div>
        {loading ? (
          <div className="grid grid-cols-[repeat(5,minmax(100px,250px))] gap-3 mt-10 h-[748px] ">
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
        ) : (
          <>
            <div className="grid lg:grid-cols-[repeat(5,minmax(100px,250px))] md:grid-cols-[repeat(4,minmax(100px,250px))] sm:grid-cols-[repeat(3,minmax(100px,250px))] gap-3 mt-10 ">
              {data.data &&
                data.data.map((item: Products) => {
                  return (
                    <Link href={`/product/${item.code}`} key={item.code}>
                      <Card className="shadow-none border-none rounded-none cursor-pointer">
                        <CardContent className="p-0 group">
                          <div className="relative w-full h-[300px] overflow-hidden ">
                            <Image
                              src={JsonToArray(item.images || "")[0] || ""}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-110 z-10 absolute transition-all"
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="py-3 px-0">
                          <div className="flex flex-col">
                            <div className="font-[500] text-sm line-clamp-2 overflow-clip">
                              {item.name}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <div className="line-through">
                                {formatPriceVND(item.price || 0)}
                              </div>
                              <div className="font-[600]">
                                Giá:{" "}
                                {formatPriceVND(
                                  discountPrice(
                                    item.price || 0,
                                    item.discount || 0
                                  )
                                )}{" "}
                              </div>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
            </div>
            <div>
              {totalPages !== 1 && (
                <Pagination className="justify-end">
                  <PaginationContent>
                    <PaginationItem className="cursor-pointer">
                      <PaginationPrevious
                        onClick={() => {
                          if (page === 1) return;
                          setPageParams(page - 1);
                        }}
                      />
                    </PaginationItem>
                    <PaginationItem
                      className="cursor-pointer"
                      onClick={() => {
                        if (page >= totalPages) return;
                        setPageParams(page + 1);
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
      </div>
    </div>
  );
};
