"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { formCreateProductSchema } from "../lib/form-schema";
import dynamic from "next/dynamic";

import {
  ChangeEvent,
  FormEventHandler,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import HtmlParser from "react-html-parser";
import { cn, formatPriceVND, getUrlExtension } from "@/lib/utils";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { CircleX, Trash } from "lucide-react";
import { requestServices } from "@/utils/request-services";
import axios from "axios";
import { Products } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ConfirmDialog } from "./confirm-dialog";
import { Editor } from "./custom-editor";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
type TProductType = {
  code: string;
  name: string;
};
interface IFormCreateProduct {
  code?: string;
  type?: "EDIT";
}
export const FormCreateProduct = ({ code, type }: IFormCreateProduct) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [productType, setProductType] = useState<TProductType[]>([]);
  const [productPut, setProductPut] = useState<Products | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [productFile, setProductFile] = useState<{
    image: string;
    video: string;
  }>({
    image: "",
    video: "",
  });
  const { register, formState, handleSubmit, setValue, getValues, reset } =
    useForm<z.infer<typeof formCreateProductSchema>>({
      mode: "onSubmit",
      resolver: zodResolver(formCreateProductSchema),
      defaultValues: {
        name_product: "",
        price: 0,
        quantity: 0,
        discount: 0,
        group_product: "mat-ong",
        product_type: [],
        image: null,
        status: false,
        video: null,
        product_info: "",
      },
    });
  useEffect(() => {
    if (code && type === "EDIT") {
      try {
        setLoading(true);
        const setProduct = async () => {
          const { data } = await requestServices.get(`/products/${code}`);
          const product: Products = data;
          if (data && product) {
            const product: Products = data;
            setValue("name_product", product.name);
            setValue("price", product.price || 0);
            setValue("discount", product.discount || 0);
            setValue("quantity", product.quantity || 0);
            setValue("group_product", product.group || "");
            setValue("product_type", JSON.parse(product.product_type || ""));
            setProductType(JSON.parse(product.product_type || ""));
            setValue("status", Boolean(product.is_show));
            setValue("product_info", product.description || "");
            // setValue("image", product.images && JSON.parse(product.images)[0]);
            setProductFile({
              image: product.images && JSON.parse(product.images)[0],
              video: product.video || "",
            });
            if (product.images && JSON.parse(product.images)[0]) {
              var imgExt = getUrlExtension(
                product.images && JSON.parse(product.images)[0]
              );

              const resImage = await fetch(
                product.images && JSON.parse(product.images)[0]
              );
              const blob = await resImage.blob();

              const file = new File([blob], "profileImage." + imgExt, {
                type: blob.type,
              });
              setValue("image", [file]);
            }
            if (product.video) {
              var imgExt = getUrlExtension(product.video);

              const resvideo = await fetch(product.video);
              const blob = await resvideo.blob();

              const file = new File([blob], "profileVideo." + imgExt, {
                type: blob.type,
              });
              setValue("video", [file]);
            }
            // formCreateProductSchema.shape.image.nullable();
            setProductPut(product);
          }
          setLoading(false);
        };
        setProduct();
      } catch (error) {
        setLoading(false);
      }
    }
  }, [code]);
  const onSubmit = async (e: any) => {
    if (!type) {
      try {
        setLoading(true);
        const formData = new FormData();
        Object.keys(formCreateProductSchema.shape).map((item: any) => {
          if (item === "video" || item === "image") {
            formData.append(item, getValues(item)[0]);
          } else if (item === "product_type") {
            formData.append(item, JSON.stringify(getValues(item)));
          } else {
            formData.append(item, getValues(item));
          }
        });
        const responsive = await requestServices.post(
          "/auth/products",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (responsive.data) {
          reset();
          setProductType([]);
          router.push("/dashboard/products");
          toast.success("Thêm sản phẩm thành công");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Thêm sản phẩm thất bại");
      }
    } else {
      const resultImage = JSON.parse(productPut?.images || "")[0];
      try {
        setLoading(true);
        const formData = new FormData();
        Object.keys(formCreateProductSchema.shape).map((item: any) => {
          if (resultImage && productFile.image !== resultImage) {
            if (item === "image") {
              formData.append(item, getValues(item)[0]);
            }
          } else {
            if (item === "image") {
              formData.append(item, "none");
            }
          }
          if (productPut && productFile.video !== productPut.video) {
            if (item === "video") {
              formData.append(item, getValues(item)[0]);
            }
          } else {
            if (item === "video") {
              formData.append(item, "none");
            }
          }
          if (item === "product_type") {
            formData.append(item, JSON.stringify(getValues(item)));
          } else {
            formData.append(item, getValues(item));
          }
        });
        Object.keys(formCreateProductSchema.shape).map((item: any) => {
          console.log(`[${item}] : `, formData.get(item));
        });
        const responsive = await requestServices.put(
          `/auth/products?code=${code}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (responsive.data) {
          reset();
          setProductType([]);
        }
        router.push("/dashboard/products");
        toast.success("Cập nhật thành công", {
          autoClose: 2000,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Cập nhật thất bại");
      }
    }
  };
  const onChangeDataInfo = (editor: any) => {
    setValue("product_info", editor);
  };

  const onChangeProductType = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      if (value.length !== 0) {
        const new_type: TProductType = {
          code: uuidv4(),
          name: value,
        };
        const new_result: TProductType | undefined = productType.find((i) =>
          i.name.includes(new_type.name)
        );
        if (!new_result) {
          setProductType([...productType, new_type]);
          setValue("product_type", [...productType, new_type]);
        }
      }
      e.preventDefault();
    }
  };
  const onRemoveProductType = (code: string) => {
    if (code) {
      const result_product_type = productType.filter(
        (item) => item.code !== code
      );
      if (result_product_type) setProductType(result_product_type);
    }
  };
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "image") {
      if (e.target.files && e.target.files[0]) {
        setProductFile({
          ...productFile,
          image: URL.createObjectURL(e.target.files[0]),
        });
        setValue("image", e.target.files);
      }
    }
    if (e.target.id === "video") {
      if (e.target.files && e.target.files[0]) {
        setProductFile({
          ...productFile,
          video: URL.createObjectURL(e.target.files[0]),
        });
        setValue("video", e.target.files);
      }
    }
  };
  const onRemoveProcduct = async (code: string | undefined) => {
    console.log(code);
    if (code) {
      try {
        setLoading(true);
        const { data } = await requestServices.delete(
          `/auth/products?code=${code}`
        );
        if (data) {
          reset();
          setProductType([]);
        }

        router.push("/dashboard/products");
        toast.success("Xoá sản phẩm thành công");
      } catch (error) {
        toast.error("Xoá sản phẩm thất bại");
      }
    } else {
      toast.error("Không tồn tại ID");
    }
  };
  return (
    <>
      <div
        className={cn(
          "absolute bg-[rgba(0,0,0,0.7)] w-full h-full top-0 left-0 z-10",
          loading ? "" : "hidden"
        )}
      >
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <>
        <div className={cn("text-end px-4", type !== "EDIT" && "hidden")}>
          <ConfirmDialog
            button="Xoá"
            header="Bạn có chắc chắn muốn xoá sản phẩm này"
            description="Sau khi xoá sản phẩm này bạn không thể khôi phục được sản phẩm này nữa, hãy chắc chắn"
            action="Xoá"
            cancel="Huỷ"
            onAction={() => onRemoveProcduct(code)}
          />
          {/* <Button onClick={() => onRemoveProcuct(code)}>
            <Trash size={20} />
          </Button> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12 px-4 py-2">
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-3">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ảnh sản phẩm
                  </label>
                  <div
                    className={cn(
                      "relative w-full h-[450px]",
                      !productFile.image && "hidden"
                    )}
                  >
                    <Image
                      fill
                      src={productFile.image}
                      className="object-cover"
                      alt="image-product"
                    />
                  </div>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div
                      className={cn("text-center", productFile.image ? "" : "")}
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Tải ảnh lên</span>
                          <input
                            id="image"
                            onChange={onChangeFile}
                            type="file"
                            accept=".jpg,.png,.svg,.webgl"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  <span className="font-[500] text-red-700 text-sm text-center">
                    {formState.errors.image?.message?.toString()}
                  </span>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Video sản phẩm
                  </label>
                  <div
                    className={(cn(!productFile.video && "hidden"), "w-full")}
                  >
                    <video className="w-full h-[320px]" controls>
                      <source src={productFile.video} type="video/mp4" />
                    </video>
                  </div>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div
                      className={cn("text-center", productFile.video ? "" : "")}
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="video"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Tải Video lên</span>
                          <input
                            id="video"
                            onChange={onChangeFile}
                            type="file"
                            accept=".mp4,.mkv"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        .mp4,.mkv,.any
                      </p>
                    </div>
                  </div>
                  <span className="font-[500] text-red-700 text-sm text-center">
                    {formState.errors.video?.message?.toString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12 px-4 py-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Thông tin sản phẩm
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Điền các thông tin sản phẩm vào
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name-product"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tên sản phẩm
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name-product"
                      {...register("name_product")}
                      autoComplete="given-name"
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-sm text-red-600 font-[500]">
                    {formState.errors.name_product?.message}
                  </span>
                </div>
                {/* <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Giá tiền
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      id="price"
                      {...register("price", { valueAsNumber: true })}
                      autoComplete="price"
                      className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-sm text-red-600 font-[500]">
                    {formState.errors.price?.message}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Giảm giá
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register("discount", { valueAsNumber: true })}
                      id="discount"
                      autoComplete="address-level1"
                      className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-sm text-red-600 font-[500]">
                    {formState.errors.discount?.message}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Số lượng
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register("quantity", { valueAsNumber: true })}
                      id="quantity"
                      autoComplete="quantity"
                      className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-sm text-red-600 font-[500]">
                    {formState.errors.quantity?.message}
                  </span>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="group_product"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nhóm sản phẩm
                  </label>
                  <div className="mt-2">
                    <select
                      id="group_product"
                      {...register("group_product")}
                      autoComplete="group_product"
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={"mat-ong"}>Mật ong</option>

                      <option value={"combo"}>Combo</option>
                      <option className="san-pham-khac">Sản phẩm khác</option>
                    </select>
                  </div>
                  <span className="text-sm text-red-600 font-[500]">
                    {formState.errors.group_product?.message}
                  </span>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="product_type"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Loại sản phẩm
                  </label>

                  <div className="mt-2">
                    <input
                      type="text"
                      name="product_type"
                      onKeyDown={onChangeProductType}
                      id="product_type"
                      className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <span className="text-sm text-red-600 font-[500]">
                    {formState.errors.product_type?.message}
                  </span>
                  <div className="mt-2">
                    <ul className="flex items-center flex-wrap gap-1">
                      {productType.map((item) => {
                        return (
                          <div key={item.code} className="flex items-center">
                            <li className="text-sm bg-green-600 px-4 py-1 rounded-lg text-white font-semibold">
                              {item.name}
                            </li>
                            <CircleX
                              onClick={() => onRemoveProductType(item.code)}
                              size={20}
                              className="ml-1"
                            />
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tình trạng sản phẩm
                  </label>
                  <div className="mt-2">
                    <select
                      id="status"
                      {...register("status")}
                      autoComplete="status"
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={"true"}>Hoạt động</option>
                      <option value={"false"}>Không hoạt động</option>
                    </select>
                  </div>
                  <span className="text-sm text-red-600 font-[500]">
                    {formState.errors.status?.message}
                  </span>
                </div>
                <div className="col-span-full">
                  <div className="flex items-center gap-8">
                    <label
                      onClick={() => setShowInfo(false)}
                      className={cn(
                        "block text-sm font-medium leading-6 text-gray-900",
                        showInfo === false
                          ? "bg-green-600 text-white px-4 py-1 rounded-lg"
                          : ""
                      )}
                    >
                      Thông tin sản phẩm
                    </label>
                    <label
                      onClick={() => setShowInfo(true)}
                      className={cn(
                        "block text-sm font-medium leading-6 text-gray-900",
                        showInfo === true
                          ? "bg-green-600 text-white px-4 py-1 rounded-lg"
                          : ""
                      )}
                    >
                      Xem trước
                    </label>
                  </div>

                  <div className="mt-2">
                    {showInfo ? (
                      <div className="border-t-gray-800 border-[1px] px-4">
                        {HtmlParser(getValues("product_info"))}{" "}
                      </div>
                    ) : (
                      <Editor
                        onChangeValue={onChangeDataInfo}
                        value={getValues("product_info")}
                      />
                      // <CustomEditor
                      //   data={getValues("product_info")}
                      //   onChangeData={onChangeDataInfo}
                      // />
                    )}
                  </div>
                  {/* <span className="text-sm text-red-600 font-[500]">
                {formState.errors.name_product?.message}
              </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {type === "EDIT" ? "Sửa sản phẩm" : "Tạo sản phẩm"}
            </button>
          </div>
        </form>
      </>
    </>
  );
};
