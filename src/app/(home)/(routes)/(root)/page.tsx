import Image from "next/image";
import { CardHome } from "../../components/card-home";
import { Navbar } from "../../components/navbar";
import BannerHome from "../../components/banner-home";
import { db } from "@/lib/db";
import { Suspense } from "react";
export default function Page() {
  return (
    <div>
      <BannerHome />
      <div className="container mx-auto">
        <div className="my-9">
          <div className="text-3xl text-black font-bold">Đặc sản mật ong</div>
          <div className="my-5 leading-10">
            <li>
              <span
                data-mce-fragment="1"
                className="text-[#121212bf] font-[500]"
              >
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
            <CardHome />
          </Suspense>
        </div>
        <div className="mt-10">
          <div className="text-3xl text-black font-bold text-center">
            Giới thiệu cửa hàng
          </div>
          <div className="my-5 leading-10"></div>
          <div className="flex justify-center">
            {/* <iframe
              width="950"
              height="420"
              src="https://www.youtube.com/embed/UWt2oFXvdC4"
              title="Hàng trăm hộ dân hiến đất mở rộng hẻm | VTV24"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe> */}
          </div>
        </div>
        {/* <div className="mt-10">
          <div className="text-3xl text-black font-bold text-center">
            Các hình ảnh cửa cửa hàng
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 md:justify-items-center gap-4 mt-20">
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
            <div className="relative md:w-[300px] h-[250px] sm:w-full group">
              <Image
                className="rounded-lg object-cover group-hover:scale-125 transition-all group-hover:z-20"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                fill
                alt=""
              />
            </div>
          </div>
        </div> */}
        <div className="mt-10">
          <div className="text-3xl text-black font-bold">
            Cam kết chất lượng
          </div>
          <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <div className=" block md:max-w-sm p-6 bg-gray-50 rounded-sm  shadow ">
              <div className="flex justify-center">
                <div className="relative w-[150px] h-[150px]">
                  <Image
                    src={"/images/nguyen-chat.png"}
                    fill
                    alt="nguyen-chat"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                Nguyên chất
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                100% nguyên chất từ thiên nhiên, không pha tạp hóa chất
              </p>
            </div>
            <div className=" block md:max-w-sm p-6 bg-gray-50 rounded-sm  shadow  ">
              <div className="flex justify-center">
                <div className=" relative w-[150px] h-[150px]">
                  <Image
                    src={"/images/nguyen-chat.png"}
                    fill
                    alt="nguyen-chat"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                An Toàn
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                Đã được kiểm định chất lượng và vệ sinh an toàn thực phẩm
              </p>
            </div>
            <div className=" block md:max-w-sm p-6 bg-gray-50  rounded-sm  shadow  ">
              <div className="flex justify-center">
                <div className=" relative w-[150px] h-[150px]">
                  <Image
                    src={"/images/nguyen-chat.png"}
                    fill
                    alt="nguyen-chat"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                Giá tốt
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                Bán trực tiếp từ nông trại với giá tốt nhất thị trường, hỗ trợ
                24/7
              </p>
            </div>
            <div className=" block md:max-w-sm p-6 bg-gray-50 rounded-sm  shadow  ">
              <div className="flex justify-center">
                <div className=" relative w-[150px] h-[150px]">
                  <Image
                    src={"/images/nguyen-chat.png"}
                    fill
                    alt="nguyen-chat"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                Bổ dưỡng
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                Bổ sung dưỡng chất tăng cường đề kháng, tốt cho sức khỏe
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="text-3xl text-black font-bold">
            Thanh toán đa dạng
          </div>
          <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <div className=" block md:max-w-sm p-6 bg-gray-50   rounded-sm  shadow  ">
              <div className="flex justify-center">
                <div className=" relative w-[150px] h-[150px]">
                  <Image src={"/images/viet-qr.jpg"} fill alt="nguyen-chat" />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                VietQR
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                Thanh toán chỉ bằng QR nhanh chóng, tiện lợi và bảo mật
              </p>
            </div>
            <div className=" block md:max-w-sm p-6 bg-gray-50 rounded-sm  shadow  ">
              <div className="flex justify-center">
                <div className=" relative w-[150px] h-[150px]">
                  <Image
                    src={"/images/chuyen-khoan.png"}
                    fill
                    alt="chuyen-khoan"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                Chuyển khoản
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                Thanh toán theo số tài khoản, nhanh chóng
              </p>
            </div>
            <div className=" block md:max-w-sm p-6 bg-gray-50  rounded-sm  shadow  ">
              <div className="flex justify-center">
                <div className=" relative w-[150px] h-[150px]">
                  <Image
                    src={"/images/nguyen-chat.png"}
                    fill
                    alt="nguyen-chat"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                Giá tốt
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                Bán trực tiếp từ nông trại với giá tốt nhất thị trường, hỗ trợ
                24/7
              </p>
            </div>
            <div className=" block md:max-w-sm p-6 bg-gray-50 rounded-sm  shadow  ">
              <div className="flex justify-center">
                <div className=" relative w-[150px] h-[150px]">
                  <Image
                    src={"/images/nguyen-chat.png"}
                    fill
                    alt="nguyen-chat"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
                Bổ dưỡng
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                Bổ sung dưỡng chất tăng cường đề kháng, tốt cho sức khỏe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
