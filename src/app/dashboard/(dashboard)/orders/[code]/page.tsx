import { FormDetailOrder } from "@/app/dashboard/components/form-detail-order";

export default function Page({ params }: { params: { code: string } }) {
  return (
    <>
      <div className="p-5">
        <h5 className="font-bold text-xl">Chi tiết đơn hàng</h5>
      </div>
      <FormDetailOrder code={params.code} />
    </>
  );
}
