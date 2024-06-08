"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ReactHtmlParser from "react-html-parser";
import { v4 as uuidv4 } from "uuid";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  JsonToArray,
  cn,
  discountPrice,
  formatPriceVND,
  isInArray,
  localStorageDB,
  shallowEqualityCheck,
} from "@/lib/utils";
import axios from "axios";
import {
  BadgeCheck,
  Check,
  ChevronsUpDown,
  CircleMinus,
  CirclePlus,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ModalDialog } from "./modal-dialog";
import { ModalDialogOrder } from "./modal-dialog-order";
import { requestServices } from "@/utils/request-services";
import { Products } from "@prisma/client";
import { toast } from "react-toastify";

type TypeShowInfo = {
  name: "DESCRIPTION" | "VIDEO";
  isShow: boolean;
};

type TValueProductType = {
  code: string;
  name: string;
};
export type TCartData = {
  code_cart: string;
  product_type_cart: TValueProductType | null;
  quantity_cart: number;
};
export const Product = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<Products>();
  const [loading, setLoading] = useState(true);
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const [valueProductType, setValueProductType] =
    useState<TValueProductType | null>(null);
  const [showInfo, setShowInfo] = useState<TypeShowInfo>({
    name: "DESCRIPTION",
    isShow: true,
  });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await requestServices.get(`/products/${id}`, {});

        if (data) setProduct(data);

        setLoading(false);
      } catch (error) {}
    };
    fetchProduct();
  }, [id]);
  const onShowInfo = ({ name }: { name: "DESCRIPTION" | "VIDEO" }) => {
    if (name === "DESCRIPTION") {
      setShowInfo({
        name: "DESCRIPTION",
        isShow: true,
      });
    } else if (name === "VIDEO") {
      setShowInfo({
        name: "VIDEO",
        isShow: true,
      });
    }
  };
  const onChangeQuantityProduct = ({ type }: { type: "-" | "+" }) => {
    if (type == "+") {
      let value = quantityProduct;
      if (product)
        if (value < product?.quantity) {
          setQuantityProduct((value += 1));
        }
    } else if (type == "-") {
      let value = quantityProduct;
      if (value > 1) setQuantityProduct((value -= 1));
    }
  };
  const onAddCart = (value: string) => {
    let cartData: TCartData[] = [];
    if (valueProductType) {
      if (value) {
        let data = localStorageDB({ name: "cart", status: "GET", data: null });
        if (!data) {
          cartData.push({
            code_cart: value,
            product_type_cart: valueProductType,
            quantity_cart: quantityProduct,
          });
          localStorageDB({
            status: "ADD",
            name: "cart",
            data: JSON.stringify(cartData),
          });
          toast.success("Thêm vào giỏ hàng thành công");
        } else {
          let data = localStorageDB({
            name: "cart",
            status: "GET",
            data: null,
          });
          let cartDataGet: [] = JSON.parse(data);
          if (!cartDataGet.find((i: any) => i.code_cart === value)) {
            let cartLocalArray = JSON.parse(data) as any[];
            cartLocalArray.push({
              code_cart: value,
              product_type_cart: valueProductType,
              quantity_cart: quantityProduct,
            });
            localStorageDB({
              status: "UPDATE",
              name: "cart",
              data: JSON.stringify(cartLocalArray),
            });
            toast.success("Thêm vào giỏ hàng thành công 2");
          } else {
          }
        }
      }
    } else {
      toast.error("Vui lòng chọn loại sản phẩm");
    }
  };
  const onOrderProduct = (value: string) => {
    // let cartData: TDataCart[] = [];
    // if (product) {
    //   cartData.push({
    //     code_cart: "1",
    //     product_type_cart: valueProductType,
    //     quantity_cart: quantityProduct,
    //     ...product,
    //   });
    //   console.log(cartData);
    // }
  };
  return (
    <>
      {loading || !product ? (
        <>Loading </>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-8 sm:grid-cols-1">
            <div>
              <div className="relative w-full h-[450px] rounded-sm group overflow-hidden">
                <Image
                  src={JsonToArray(product.images || "")[0] || ""}
                  className="object-cover rounded-sm group-hover:scale-125 transition-all"
                  fill
                  alt={product?.name}
                />
              </div>
              <div></div>
            </div>
            <div className="">
              <h5 className="text-3xl font-bold">{product?.name}</h5>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <FaStar color="#ffd921" size={18} />
                  <FaStar color="#ffd921" size={18} />
                  <FaStar color="#ffd921" size={18} />
                  <FaStar color="#ffd921" size={18} />
                  <FaStar color="#ffd921" size={18} />
                </div>
                <div className="text-gray font-[500] text-sm">
                  49.912 Đã bán
                </div>
              </div>
              <div className="mt-3 text-md">
                <h5 className="text-md font-[500]">Chọn loại sản phẩm</h5>
                <div className="mt-3">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[250px] justify-between"
                      >
                        {valueProductType && product.product_type
                          ? JsonToArray(product.product_type as string).find(
                              (framework: any) =>
                                framework.code === valueProductType.code
                            )?.name
                          : "Tìm loại sản phẩm..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Loại sản phẩm..." />
                        <CommandEmpty>Tìm loại sản phẩm.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {JsonToArray(product.product_type || "").map(
                              (framework: any) => (
                                <CommandItem
                                  key={framework.code}
                                  value={framework.code}
                                  onSelect={(currentValue) => {
                                    setValueProductType(
                                      currentValue === valueProductType?.code
                                        ? null
                                        : {
                                            code: currentValue,
                                            name: framework.name,
                                          }
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      valueProductType?.code === framework.code
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {framework.name}
                                </CommandItem>
                              )
                            )}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mt-3 flex gap-2 items-baseline">
                <span className="font-bold text-orange-600 text-xl">
                  Giá:{" "}
                  {formatPriceVND(
                    discountPrice(product.price || 0, product.discount || 0)
                  )}{" "}
                  -
                </span>
                <span className="font-bold line-through text-gray-500 text-base">
                  {formatPriceVND(product.price || 0)}
                </span>
              </div>
              <div className="mt-3">
                <h5 className="font-bold">Mô tả</h5>
                <div className="ml-5 leading-[1.9] mt-2">
                  {JsonToArray(product.product_type || "").map((item: any) => {
                    return (
                      <div key={item.code}>
                        <h5 className="font-[600] text-gray-700">
                          {"-> " + item.name}
                        </h5>
                        <div className="text-gray-600">{item.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => onChangeQuantityProduct({ type: "-" })}
                      className="rounded-full w-8 h-8 p-0 bg-orange-600 hover:bg-orange-700"
                    >
                      <CircleMinus />
                    </Button>
                    <Input
                      className="w-20 text-center font-bold outline-none focus-visible:ring-0"
                      value={quantityProduct}
                    />
                    <Button
                      onClick={() => onChangeQuantityProduct({ type: "+" })}
                      className="rounded-full w-8 h-8 p-0 bg-orange-600 hover:bg-orange-700"
                    >
                      <CirclePlus />
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => onAddCart(product.code)}
                      className="bg-orange-500 hover:bg-orange-600 flex items-center"
                    >
                      <ShoppingCart className="mr-2" />
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <ModalDialog
                  titleButton="Đặt hàng ngay"
                  is_button={valueProductType ? false : true}
                >
                  <ModalDialogOrder
                    data_product={[
                      {
                        code_cart: uuidv4(),
                        product_type_cart: valueProductType,
                        quantity_cart: quantityProduct,
                        cart_data: {
                          ...product,
                        },
                      },
                    ]}
                  />
                </ModalDialog>
              </div>
              <div className="mt-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <BadgeCheck size={36} />
                    <span className="text-center font-[500] text-gray-500">
                      Giá ưu đãi đặc biệt từ nông trại không thể rẻ hơn
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BadgeCheck size={36} />
                    <span className="text-center font-[500] text-gray-500">
                      Ship nhanh, nhận mới thanh toán, đổi trả miễn phí
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BadgeCheck size={36} />
                    <span className="text-center font-[500] text-gray-500">
                      Cam kết 100% nguyên chất tự nhiên đã kiểm định
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BadgeCheck size={36} />
                    <span className="text-center font-[500] text-gray-500">
                      Hotline hỗ trợ 8h-22h mỗi ngày 035.412.8181
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex items-center flex-wrap gap-8">
              <div
                onClick={() => onShowInfo({ name: "DESCRIPTION" })}
                className="font-bold text-xl relative cursor-pointer"
              >
                <span>Thông tin sản phẩm</span>
                <div
                  className={cn(
                    "absolute w-5/6 h-1 rounded-lg bg-orange-600 left-0 right-0 mr-auto ml-auto",
                    showInfo.name === "DESCRIPTION" && showInfo.isShow == true
                      ? ""
                      : "hidden"
                  )}
                ></div>
              </div>
              <div
                onClick={() => onShowInfo({ name: "VIDEO" })}
                className="font-bold text-xl relative cursor-pointer"
              >
                <span>Video sản phẩm</span>
                <div
                  className={cn(
                    "absolute w-5/6 h-1 rounded-lg bg-orange-600 left-0 right-0 mr-auto ml-auto",
                    showInfo.name === "VIDEO" && showInfo.isShow == true
                      ? ""
                      : "hidden"
                  )}
                ></div>
              </div>
            </div>
            <div className="mt-4">
              {showInfo.name === "DESCRIPTION" ? (
                <div className="overflow-x-auto">
                  {ReactHtmlParser(product.description || "")}
                </div>
              ) : (
                <video className="w-full" controls>
                  <source src={product.video || ""} />
                </video>
              )}
            </div>
          </div>
          <div className="mt-8">
            <div>
              <h1 className="text-2xl font-bold">Sản phẩm khác</h1>
              <div className="grid lg:grid-cols-[repeat(5,minmax(100px,250px))] md:grid-cols-[repeat(4,minmax(100px,250px))] sm:grid-cols-[repeat(3,minmax(100px,250px))] gap-3 mt-10"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
