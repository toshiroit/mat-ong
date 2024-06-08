import { Input } from "@/components/ui/input";
import { TableProduct } from "../../components/table-product";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div className="p-5">
        <h5 className="font-bold text-xl">Quản lí sản phẩm</h5>
      </div>
      <Suspense fallback={<div>Loading.....</div>}>
        <TableProduct />
      </Suspense>
    </>
  );
}
