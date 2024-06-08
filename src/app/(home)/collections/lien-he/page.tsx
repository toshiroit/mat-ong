import { Contact } from "../../components/contact";

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="my-9">
        <div className="text-3xl text-black font-bold">Thông tin liên hệ</div>
        <div className="my-4 leading-10">
          <li>
            <span data-mce-fragment="1" className="text-[#121212bf] font-[500]">
              Liên hệ chúng tôi qua các phương liên lạc được cung cấp bên dưới
            </span>
          </li>
          <li>
            <span className="text-[#121212bf] font-[500]">
              Chung tôi sẽ liện hệ lại bạn sớm nhất khi nhận được thông tin đặt
              hàng hoặc hõ trợ từ bạn
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
        <Contact />
      </div>
    </div>
  );
}
