import { Suspense } from "react";
import { ProductAll } from "../../components/product-all";

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="my-9">
        <div className="text-3xl text-black font-bold">Mật ong</div>
        <div className="my-4 leading-10">
          <li>
            <span data-mce-fragment="1" className="text-[#121212bf] font-[500]">
              Đặc sản Tây Nguyên gồm mật ong nguyên chất, tinh bột nghệ, các
              loại hạt dinh dưỡng từ thiên nhiên, muối kiến vàng, bò một nắng
              đặc sản Krong Pa,...
            </span>
          </li>
          <li>
            <span className="text-[#121212bf] font-[500]">
              Cam kết&nbsp;sản phẩm đặc sản vùng Tây Nguyên,&nbsp;đặc sản
              đaklak, đặc sản Gia Lai nguyên chất 100%,&nbsp;có giấy kiểm định
              chất lượng và vệ sinh an toàn thực phẩm.
            </span>
          </li>
          <li>
            <span className="text-[#121212bf] font-[500]">
              Miễn phí giao hàng toàn quốc từ đơn hàng 165.000 VNĐ trở lên.
            </span>
          </li>
        </div>
      </div>
      <div>
        <Suspense>
          <ProductAll product_all_type="mat-ong" />
        </Suspense>
      </div>
    </div>
  );
}
