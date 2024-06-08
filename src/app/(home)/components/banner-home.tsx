import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BannerHome() {
  return (
    <div className="">
      <div className="relative w-full h-[850px] ">
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,29,35,0.8)] content-none w-full h-full z-[1]"></div>
        <Image
          src={"/images/banner_test.jpg"}
          alt="banner"
          fill
          className="object-cover"
        />
        <div className="absolute z-10 top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] text-center">
          <div className="text-white text-5xl font-[900] leading-[1.7] ">
            Đặc sản tây nguyên, Đễ được hỗ trợ nhanh nhất bạn liên hệ mình qua
          </div>
          <div className="text-[rgba(255,255,255,0.5)] text-lg">
            Liên hệ ngay với chúng tôi để được tư vấn và hướng dẫn sử dụng các
            sản phẩm của chúng tôi để có được nhu cầu dáp ứng tốt nhất
          </div>
          <div className="flex justify-center mt-5">
            <Link href={"https://www.facebook.com/"}>
              <Button className="bg-orange-600 py-6 px-4 text-lg flex items-center rounded-md text-white hover:bg-red-600">
                Liên hệ ngay
                <div className="inline-flex text-primary ml-2">
                  <CircleArrowRight size={32} color="#ffffff" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
