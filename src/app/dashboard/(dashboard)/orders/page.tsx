import { Suspense } from "react";
import { TableOrder } from "../../components/table-order";

export default function Page() {
  return (
    <>
      <div className="p-5">
        <h5 className="font-bold text-xl">Quản lí đơn hàng</h5>
      </div>
      <Suspense>
        <TableOrder />
      </Suspense>
    </>
  );
}
