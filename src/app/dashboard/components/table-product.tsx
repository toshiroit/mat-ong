"use client";
import { LoadingSpinner } from "@/app/(home)/components/loading-1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { JsonToArray, cn, formatPriceVND } from "@/lib/utils";
import { requestServices } from "@/utils/request-services";
import { Products } from "@prisma/client";

import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
interface IProducts {
  data: Products[] | null;
  count: number;
}
export const TableProduct = () => {
  const [product, setProduct] = useState<IProducts>({ data: [], count: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const pageNum = Number(searchParams?.get("page")) || 1;
  const totalPages = Math.ceil(product?.count / 5);

  const setPageParams = (page: number) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  };
  useEffect(() => {
    try {
      const getProduct = async () => {
        setLoading(true);
        try {
          const { data } = await requestServices.get(
            `/products?page=${searchParams?.get("page") || 1}&q=${textSearch}`
          );
          if (data) {
            setProduct({
              data: data.products,
              count: data.count,
            });
          }
          setLoading(false);
        } catch (error) {
          setProduct({
            data: null,
            count: 0,
          });
        }
      };
      getProduct();
    } catch (error) {
      setLoading(false);
    }
  }, [searchParams, textSearch]);
  const onSearchProuct = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = e.target as HTMLInputElement;
      setTextSearch(data.value);
      console.log(data.value);
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="">
            <Input
              onKeyDown={onSearchProuct}
              className="focus-visible:ring-0 w-[450px]"
              placeholder="Tìm kiếm sản phẩm"
            />
          </div>
          <div>
            <Link href={"/dashboard/products/create"}>
              <Button>Thêm sản phẩm</Button>
            </Link>
          </div>
        </div>
        {loading ? (
          <h5 className="p-6 font-bold">Đang tải dữ liệu</h5>
        ) : (
          <>
            <div className="px-4 ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
                  <tr>
                    <th scope="col" className="px-3 py-3 w-32 text-center">
                      Hình ảnh
                    </th>
                    <th scope="col" className="px-6 py-3 w-[350px]">
                      Tên SP
                    </th>
                    <th scope="col" className="px-6 py-4 w-[150px]">
                      Nhóm SP
                    </th>
                    <th scope="col" className="px-6 py-3 w-[150px]">
                      Giá tiền
                    </th>
                    <th scope="col" className="px-6 py-3 w-[150px] text-center">
                      Giảm giá
                    </th>
                    <th scope="col" className="px-6 py-3 w-[150px] text-center">
                      Tình trạng
                    </th>
                    <th scope="col" className="px-6 py-3 w-[150px] text-center">
                      Đã bán
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  w-[150px] text-center"
                    >
                      Đáp ứng
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Cài đặt
                    </th>
                  </tr>
                </thead>
                <tbody className="h-10 overflow-y-auto">
                  {product?.data?.map((item) => {
                    return (
                      <tr
                        key={item.code}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="w-32 h-24 relative rounded-lg">
                            <Image
                              src={JsonToArray(item.images || "")[0] || ""}
                              fill
                              alt="Product"
                              className="object-cover rounded-lg"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 w-[350px]  ">
                          <div className="w-[350px] line-clamp-2">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 w-[150px] font-bold">
                          {item.group}
                        </td>
                        <td className="px-6 py-4 w-[150px] font-bold">
                          {formatPriceVND(item.price || 0)}
                        </td>
                        <td className="px-6 py-4 w-[150px] text-center font-bold">
                          {item.discount}%
                        </td>
                        <td className="px-6 py-4 w-[100px] text-center">
                          <div
                            className={cn(
                              " text-white text-center p-1 rounded-lg font-[500]",
                              item.is_show ? "bg-green-600" : "bg-red-600"
                            )}
                          >
                            {item.is_show ? "Hiện" : "Ẩn"}
                          </div>
                        </td>
                        <td className="px-6 py-4 w-[150px] text-center font-bold">
                          {item.sold}
                        </td>
                        <td className="px-6 py-4 w-[150px] text-center font-bold">
                          100%
                        </td>
                        <td className="px-6 py-4 w-[150px]  font-bold text-center">
                          <Link href={`/dashboard/products/edit/${item.code}`}>
                            <div className="text-end flex justify-center animate-spin cursor-pointer">
                              <Settings />
                            </div>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-3">
              {totalPages !== 1 && (
                <Pagination className="justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          if (pageNum === 1) return;
                          setPageParams(pageNum - 1);
                        }}
                      />
                    </PaginationItem>
                    <PaginationItem
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
      </div>
    </>
  );
};
