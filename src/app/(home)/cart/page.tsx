import { CartTable } from "../components/cart-table";

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="my-9">
        <div className="text-3xl text-black font-bold">Giỏ hàng của bạn</div>
      </div>
      <div>
        <CartTable />
      </div>
    </div>
  );
}
