import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export const MenuMobile = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden p-4 hover:opacity-75 transition">
        <Menu size={40} />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="p-0 bg-black w-[240px] border-none"
      >
        <div>
          <div className="py-4">
            <h5 className="text-white text-center">MENU</h5>
          </div>
          <div className="mt-8">
            <ul>
              <Link href={"/dashboard"}>
                <li className="text-white py-2 px-6 text-lg font-[500]">
                  Dashborad
                </li>
              </Link>
              <Link href={"/dashboard/products"}>
                <li className="text-white py-2 px-6 text-lg font-[500]">
                  Sản phẩm
                </li>
              </Link>
              <Link href={"/dashboard/orders"}>
                <li className="text-white py-2 px-6 text-lg font-[500]">
                  Đơn hàng
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
