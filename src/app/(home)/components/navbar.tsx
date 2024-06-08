"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ProductSearch } from "./product-search";
import { useOutsideClick } from "@/app/hooks/use-outside";
import { requestServices } from "@/utils/request-services";
import { Products } from "@prisma/client";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [textSearch, setTextSearch] = useState<String | null>(null);
  const [products, setProducts] = useState<Products[] | null>(null);
  const ref = useOutsideClick(() => {
    setShowSearch(false);
  });
  const onShowSearch = () => {
    return setShowSearch(!showSearch);
  };
  useEffect(() => {
    try {
      const getFindProduct = async () => {
        if (textSearch) {
          setProducts(null);
        }
        if (textSearch) {
          try {
            const { data } = await requestServices.get(
              `/products/find/${textSearch}`
            );
            if (data) {
              setProducts(data.products);
            }
          } catch (error) {}
        }
      };
      getFindProduct();
    } catch (error) {}
  }, [textSearch]);
  const isActive = (path: any) => path === pathname;
  const onSearchProduct = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setShowSearch(false);
      setTextSearch("");
      router.push(`/search?q=${textSearch}`);
    }
  };
  return (
    <div className="py-4 container mx-auto max-md:hidden">
      <div className="grid grid-cols-[auto_1fr_auto] gap-10 items-center ">
        <Link
          href={"/"}
          className="relative w-[50px] h-[50px] place-items-center items-center"
        >
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            className="object-cover"
            fill
          />
        </Link>
        <div
          className={cn(
            "grid grid-cols-6 gap-4 text-center ",
            showSearch ? "hidden" : ""
          )}
        >
          <Link
            href={"/collections/tat-ca-san-pham"}
            className={cn(
              "font-[500] text-sm",
              isActive("/collections/tat-ca-san-pham") ? "text-orange-500" : ""
            )}
          >
            Tất cả sản phẩm
          </Link>
          <Link
            href={"/collections/mat-ong"}
            className={cn(
              "font-[500] text-sm",
              isActive("/collections/mat-ong") ? "text-orange-500" : ""
            )}
          >
            Mật ong
          </Link>
          <Link
            href={"/collections/combo-uu-dai"}
            className={cn(
              "font-[500] text-sm",
              isActive("/collections/combo-uu-dai") ? "text-orange-500" : ""
            )}
          >
            Combo ưu đãi
          </Link>
          <Link href={"/"} className="font-[500] text-sm">
            Tin tức
          </Link>
          <Link
            href={"/collections/lien-he"}
            className={cn(
              "font-[500] text-sm",
              isActive("/collections/lien-he") ? "text-orange-500" : ""
            )}
          >
            {" "}
            Liên hệ
          </Link>
        </div>
        <div
          ref={ref}
          className={cn(
            "transition-opacity relative",
            showSearch
              ? "visible opacity-100 transition-opacity"
              : "hidden opacity-0"
          )}
        >
          <Input
            onChange={(e) => setTextSearch(e.target.value)}
            onKeyDown={onSearchProduct}
            className={
              "focus-visible:ring-0  text-base border-gray-700 outline-none"
            }
            placeholder="Tìm kiếm sản phẩm"
          />
          {products && (
            <>
              <div className="w-full absolute z-20 bg-white shadow-lg">
                <h5 className="font-[500] text-gray-600 px-4 py-2">
                  {textSearch && (
                    <>
                      Tìm kiếm sản phẩm:{" "}
                      <b className="text-gray-700">{textSearch}</b>
                    </>
                  )}
                </h5>
                <div className="mt-1 ">
                  {products &&
                    products.map((item) => {
                      return <ProductSearch {...item} key={item.code} />;
                    })}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="hover:scale-125 transition-all">
            <Search onClick={() => onShowSearch()} size={22} />
          </div>
          <Link href={"/cart"}>
            <div className="hover:scale-125 transition-all cursor-pointer">
              <div className="relative">
                <ShoppingCart className="" size={22} />
                <div className="absolute bottom-3 left-4 bg-black w-4 h-4 text-center rounded-full text-white leading-[1.1]">
                  1
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
