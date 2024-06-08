"use client";
import { Button } from "@/components/ui/button";
import { JsonToArray, cn, discountPrice, formatPriceVND } from "@/lib/utils";
import { requestServices } from "@/utils/request-services";
import { Orders, Products } from "@prisma/client";
import {
  Calendar,
  CircleUserRound,
  Eye,
  Info,
  MapPin,
  Printer,
  Ship,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { PrintInvoice } from "./print-invoice";
interface IOrderDetail extends Orders {
  products_data: Products[];
}
export const FormDetailOrder = ({ code }: { code: string }) => {
  const [order, setOrder] = useState<IOrderDetail>();
  const [loading, setLoading] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const refPrint = useRef(null);
  useEffect(() => {
    if (code) {
      setLoading(true);
      const getOrderDetail = async () => {
        try {
          const res = await requestServices.get(
            `/auth/orders/detail?code=${code}`
          );
          if (res.data) {
            setOrder({
              ...res.data.order,
              products_data: res.data.products,
            });
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      getOrderDetail();
    }
  }, [code]);
  return (
    <div className="p-4">
      <div ref={refPrint} className={cn(showPrint ? "" : "hidden")}>
        <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
          <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
            Mật ong núi rừng
          </h1>
          <hr className="mb-2" />
          <div className="flex justify-between mb-6">
            <h1 className="text-lg font-bold">Hoá đơn</h1>
            <div className="text-gray-700">
              <div>
                Date: {new Date().toISOString().slice(0, 10).replace("T", " ")}
              </div>
            </div>
          </div>
          <div>
            <h5>
              <span className="text-sm font-[500] text-gray-600">
                #{order?.code}
              </span>
            </h5>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Thông tin:</h2>
            <div className="text-gray-700 mb-2">
              Họ và tên: <b>{order?.fullName}</b>
            </div>
            <div className="text-gray-700 mb-2">
              Địa chỉ : <b> {order?.address}</b>
            </div>
            <div className="text-gray-700 mb-2">
              Email: <b>{order?.email}</b>
            </div>
            <div className="text-gray-700 mb-2">
              Số điện thoại: <b>0{order?.phone}</b>
            </div>
          </div>
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th className="text-left font-bold text-gray-700">Thông tin</th>
                <th className="text-center">SL</th>
                <th className="text-right font-bold text-gray-700">Số tiền</th>
              </tr>
            </thead>
            <tbody>
              {order?.products_data &&
                order.products_data.map((item) => {
                  return (
                    <tr key={item.code}>
                      <td className="text-left w-52 text-gray-700">
                        {item.name}
                      </td>
                      <td className="text-center">{item.quantity_cart}</td>
                      <td className="text-right text-gray-700">
                        {formatPriceVND(item.quantity_cart * (item.price || 0))}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-left font-bold text-gray-700">Tổng tiền</td>
                <td className="text-right font-bold text-gray-700">
                  {formatPriceVND(order?.total_price || 0)}
                </td>
              </tr>
            </tfoot>
          </table>
          {/* <div className="text-gray-700 mb-2">Thank you for your business!</div>
          <div className="text-gray-700 text-sm">
            Please remit payment within 30 days.
          </div> */}
        </div>
      </div>
      {order && (
        <>
          <div className="bg-white shadow-md p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar />
                <div className="ml-2 font-[600]">
                  <div>
                    {new Date(order.createdAt)
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " ")}
                  </div>
                  <div className="text-sm text-gray-500">#{code}</div>
                </div>
              </div>
              <div>
                <Button onClick={() => setShowPrint(!showPrint)}>
                  {/* <Printer /> */}
                  <ReactToPrint
                    trigger={() => <Printer />}
                    content={() => (showPrint ? refPrint.current : null)}
                  />
                </Button>
              </div>
            </div>
            <hr className="mt-8" />
            <div className="mt-8 grid grid-cols-3">
              <div className="flex">
                <div className="bg-blue-100 p-[0.5rem] rounded-full">
                  <CircleUserRound
                    color="#0090db"
                    size={30}
                    strokeWidth={1.4}
                  />
                </div>
                <div className="ml-2">
                  <h4 className="text-md font-bold leading-[1.8]">
                    Thông tin khách hàng
                  </h4>
                  <div className="text-sm font-[500] leading-[1.8]">
                    {order.fullName}
                  </div>
                  <div className="text-sm font-[500] leading-[1.8]">
                    {order.email}
                  </div>
                  <div className="text-sm font-[500] leading-[1.8]">
                    +84 {order.phone}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="bg-blue-100 p-[0.5rem] rounded-full">
                  <Truck color="#0090db" size={30} strokeWidth={1.8} />
                </div>
                <div className="ml-2">
                  <h4 className="text-md font-bold">Thanh toán</h4>

                  <div className="leading-[1.8]">
                    <span className="text-gray-500 font-[500] text-sm">
                      Hình thức giao:
                      <b className="text-black text-md ml-2">Giao hàng</b>
                    </span>
                  </div>
                  <div className="leading-[1.8]">
                    <span className="text-gray-500 font-[500] text-sm">
                      Loại thanh toán:
                      <b className="text-black text-md ml-2">Tiền mặt</b>
                    </span>
                  </div>
                  <div className="leading-[1.8]">
                    <span className="text-gray-500 font-[500] text-sm">
                      Tình trạng:
                      <b className="text-black text-md ml-2">Đang thanh toán</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="bg-blue-100 p-[0.5rem] rounded-full">
                  <MapPin color="#0090db" size={30} strokeWidth={1.4} />
                </div>
                <div className="ml-2">
                  <h4 className="text-md font-bold">Địa chỉ giao hàng</h4>
                  <div className="text-sm font-[500] leading-[1.8]">
                    <p className="text-gray-500">{order.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg col-span-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Sản phẩm
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Số lượng
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Giá tiền
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products_data &&
                      order.products_data.map((item, key) => {
                        return (
                          <tr
                            key={item.code}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="p-4">
                              <div className="w-[80px] h-[80px] md:w-32 max-w-full max-h-full relative rounded-lg">
                                <Image
                                  src={JsonToArray(item.images || "")[0] || ""}
                                  fill
                                  className="object-cover rounded-lg"
                                  alt="Apple Watch"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              <div className="line-clamp-2 overflow-clip">
                                {item.name}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div>
                                  <input
                                    type="number"
                                    value={item.quantity_cart}
                                    id="first_product"
                                    className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 w-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              {formatPriceVND(
                                item.quantity_cart *
                                  (discountPrice(
                                    item.price || 0,
                                    item.discount || 0
                                  ) || 0)
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <Link
                                href={`/product/${item.code}`}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              >
                                <Eye />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="flex justify-end p-4">
                  <div className="flex-initial w-56">
                    <div className="flex justify-between items-center">
                      <span className="font-[500] text-gray-500 text-sm">
                        Tổng tiền:
                      </span>
                      <span className="font-bold text-md  text-black">
                        {formatPriceVND(order.total_price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow-lg">
                <div className="px-4 py-2">
                  <h5 className="font-bold flex items-center">
                    <Info className="mr-2" />
                    Thông tin
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div>
                    <div className="">
                      <span>
                        Tổng tiền: <b> {formatPriceVND(order.total_price)}</b>
                      </span>
                    </div>
                    <div>
                      <span>
                        Sản phẩm: <b>{order.products_data.length}</b>
                      </span>
                    </div>
                    <div>
                      <span>
                        Hình thức: <b>Giao hàng</b>
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>
                        Tên khách hàng: <b>{order.fullName}</b>
                      </span>
                    </div>
                    <div>
                      <span>
                        Số điện thoại: <b>0{order.phone}</b>
                      </span>
                    </div>
                    <div>
                      <span>
                        Địa chỉ: <b>{order.address}</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
