"use client";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const MobileSidebar = () => {
  const [textSearch, setTextSearch] = useState<String | null>(null);
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();

  const onSearchProduct = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const x = e.target as HTMLInputElement;
      router.push(`/search?q=${x.value}`);
      setOpen(true);
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="md:hidden p-4 hover:opacity-75 transition">
        <Menu size={40} />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white">
        <div>
          <div className="py-4">
            <h5 className=" text-center">MENU</h5>
          </div>
          <div>
            <Input onKeyDown={onSearchProduct} placeholder="Tìm kiếm" />
          </div>
          <div className="mt-8">
            <ul>
              <Link href={"/dashboard"}>
                <li className="py-2 px-6 text-lg font-[500]">
                  Tất cản sản phẩm
                </li>
              </Link>
              <Link href={"/collections/mat-ong"}>
                <li className="py-2 px-6 text-lg font-[500]">Mật ong</li>
              </Link>
              <Link href={"/collections/combo-uu-dai"}>
                <li className="py-2 px-6 text-lg font-[500]">Combo ưu đãi</li>
              </Link>
              <Link href={"/"}>
                <li className="py-2 px-6 text-lg font-[500]">Liên hệ</li>
              </Link>
              <Link href={"/cart"}>
                <li className="py-2 px-6 text-lg font-[500]">Giỏ hàng</li>
              </Link>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
