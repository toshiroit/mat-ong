import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Contact = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="block shadow-lg border-4 border-t-red-800 rounded-t-lg">
        <h3 className="p-4 text-center text-3xl font-bold text-[#44A1F5]">
          Zalo
        </h3>
        <div className="px-8">
          <div className="relative w-full h-40">
            <Image
              src={"/images/zalo.png"}
              alt="logo-zalo"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-gray-700 font-[500] mt-4">
            Liên hệ chúng tôi qua Zalo để được hỗ trợ, tư vấn, giải đáp các thắc
            mắc của bạn nhanh nhất
          </p>
        </div>
        <div className="text-center mt-5 py-4">
          <Button className="bg-[#44A1F5]">Liên hệ ngay</Button>
        </div>
      </div>
      <div className="block shadow-lg border-4 border-t-red-800 rounded-t-lg">
        <h3 className="p-4 text-center text-3xl font-bold text-[#44A1F5]">
          Số điện thoại
        </h3>
        <div className="px-8">
          <div className="relative w-full h-40">
            <Image
              src={"/images/phone.png"}
              alt="logo-phone"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-gray-700 font-[500] mt-4">
            Liên hệ chúng tôi qua Zalo để được hỗ trợ, tư vấn, giải đáp các thắc
            mắc của bạn nhanh nhất
          </p>
        </div>
        <div className="text-center mt-5 py-4">
          <Button className="bg-[#44A1F5]">Liên hệ ngay</Button>
        </div>
      </div>
      <div className="block shadow-lg border-4 border-t-red-800 rounded-t-lg">
        <h3 className="p-4 text-center text-3xl font-bold text-[#EF5041]">
          Gmail
        </h3>
        <div className="px-8">
          <div className="relative w-full h-40">
            <Image
              src={"/images/gmail.jpg"}
              alt="logo-gmail"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-gray-700 font-[500] mt-4">
            Liên hệ chúng tôi qua Zalo để được hỗ trợ, tư vấn, giải đáp các thắc
            mắc của bạn nhanh nhất
          </p>
        </div>
        <div className="text-center mt-5 py-4">
          <Button className="bg-[#44A1F5]">Liên hệ ngay</Button>
        </div>
      </div>
    </div>
  );
};
