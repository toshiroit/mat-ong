import { FormCreateProduct } from "@/app/dashboard/components/form-create-product";
import { getPageTitle } from "@/app/dashboard/config";
import Head from "next/head";

export default function Page() {
  return (
    <div className="relative">
      <Head>
        <title>{getPageTitle("Thêm sản phẩm")}</title>
      </Head>
      <div className="p-5">
        <h5 className="font-bold text-xl">Thêm sản phẩm</h5>
      </div>
      <FormCreateProduct />
    </div>
  );
}
