"use client";
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
import { cn, formatPriceVND } from "@/lib/utils";
import { requestServices } from "@/utils/request-services";
import { Orders } from "@prisma/client";
import { Eye, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
interface IOrders {
  data: Orders[] | null;
  count: number;
}
export const TableOrder = () => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState<string>("");
  const [orders, setOrders] = useState<IOrders>({
    count: 0,
    data: [],
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const pageNum = Number(searchParams?.get("page")) || 1;
  const totalPages = Math.ceil(orders?.count / 10);
  useEffect(() => {
    try {
      setLoading(true);
      const getOrders = async () => {
        try {
          const result = await requestServices.get(
            `/auth/orders?page=${
              searchParams?.get("page") || 1
            }&code=${textSearch}`
          );
          if (result.data) {
            setOrders({
              data: Object.values(result.data.orders),
              count: result.data.count,
            });
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      getOrders();
    } catch (error) {
      setLoading(false);
    }
  }, [searchParams, textSearch]);
  const setPageParams = (page: number) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  };
  const onSearchOrder = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const textSearch = e.target as HTMLInputElement;
      setTextSearch(textSearch.value);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="">
          <Input
            onKeyDown={onSearchOrder}
            className="focus-visible:ring-0 w-[450px]"
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
        <div>
          <Link href={"/dashboard/products/create"}></Link>
        </div>
      </div>
      <div className="px-4 w-full">
        {loading ? (
          <div className="bg-white py-4 md:py-7 px-2 md:px-8 xl:px-10">
            <div className="font-bold">Đang tải dữ liệu .....</div>
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="px-4 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Action
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdownAction"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Reward
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Promote
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Activate account
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete User
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-[300px]">
                    Mã đơn hàng
                  </th>
                  <th scope="col" className="px-6 py-3 w-[150px]">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 w-[100px]">
                    Số điện thoại
                  </th>
                  <th scope="col" className="px-6 py-3 w-[250px]">
                    Địa chỉ
                  </th>
                  <th scope="col" className="px-6 py-3 w-[80px]">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 w-[80px]">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3 w-[80px]">
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-6 py-3 w-[140px]">
                    Ngày đặt
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.data &&
                  orders.data.map((item: any) => {
                    return (
                      <tr
                        key={item.code}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white overflow-clip w-[300px]"
                        >
                          <div className="text-base font-semibold line-clamp-1 w-[300px]">
                            {item.code}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <div className="text-md font-semibold w-[150px] whitespace-nowrap overflow-clip">
                            {item.email}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <div className="text-md font-semibold w-[100px]">
                            0{item.phone}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <div className="text-md font-semibold w-[250px] line-clamp-2">
                            {item.address}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <div className="text-md font-semibold w-[80px] text-center">
                            {item.quantity}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <div className="text-md font-semibold w-[80px] text-center">
                            {item.product.length}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <div className="text-md font-semibold w-[80px] text-center">
                            {formatPriceVND(1)}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <div className="text-md font-semibold w-[140px]">
                            {new Date(item.createdAt)
                              .toISOString()
                              .slice(0, 19)
                              .replace("T", " ")}
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          <Link href={`orders/${item.code}`}>
                            <Eye color="green" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* Edit user modal */}
          </div>
        )}
        <div className="p-3">
          {totalPages !== 1 && (
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
                <PaginationItem></PaginationItem>
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
      </div>
    </div>
  );
};
