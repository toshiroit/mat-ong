import { FormCreateProduct } from "@/app/dashboard/components/form-create-product";
import { getPageTitle } from "@/app/dashboard/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Page({ params }: { params: { code: string } }) {
  return (
    <div>
      <div className="relative">
        <Head>
          <title>{getPageTitle("Sửa sản phẩm")}</title>
        </Head>
        <div className="p-5">
          <h5 className="font-bold text-xl">
            Sửa sản phẩm:{" "}
            <b className="text-green-600 font-[600]">{params.code}</b>
          </h5>
        </div>
        <FormCreateProduct code={params.code} type="EDIT" />
      </div>
    </div>
  );
}
