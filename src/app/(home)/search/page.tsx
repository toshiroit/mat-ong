import { Suspense } from "react";
import { ProductAll } from "../components/product-all";
export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="my-9">
        <div className="text-3xl text-black font-bold">
          Tìm kiếm sản phẩm: <b className="text-2xl text-gray-700"></b>
        </div>
      </div>
      <div>
        <Suspense>
          <ProductAll product_all_type="find" />
        </Suspense>
      </div>
    </div>
  );
}
