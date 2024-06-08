"use client";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, MessageCircle, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MenuMobile } from "./menu-mobile";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <MenuMobile />
        <div className="max-lg:hidden ">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search size={20} />
              </button>
              <input
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                type="text"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li className="relative">
              <a
                className="relative p-1 flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                href="#"
              >
                <span className="absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 inline">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75" />
                </span>
                <Bell size={20} />
              </a>
              <div className="absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 hidden">
                <div className="px-4.5 py-3">
                  <h5 className="text-sm font-medium text-bodydark2">
                    Notification
                  </h5>
                </div>
                <ul className="flex h-auto flex-col overflow-y-auto">
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          Edit your information in a swipe
                        </span>{" "}
                        Sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim.
                      </p>
                      <p className="text-xs">12 May, 2025</p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          It is a long established fact
                        </span>{" "}
                        that a reader will be distracted by the readable.
                      </p>
                      <p className="text-xs">24 Feb, 2025</p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          There are many variations
                        </span>{" "}
                        of passages of Lorem Ipsum available, but the majority
                        have suffered
                      </p>
                      <p className="text-xs">04 Jan, 2025</p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          There are many variations
                        </span>{" "}
                        of passages of Lorem Ipsum available, but the majority
                        have suffered
                      </p>
                      <p className="text-xs">01 Dec, 2024</p>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="relative">
              <a
                className="relative p-1 flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                href="#"
              >
                <span className="absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 inline">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75" />
                </span>
                <MessageCircle size={20} />
              </a>
              <div className="absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 hidden">
                <div className="px-4.5 py-3">
                  <h5 className="text-sm font-medium text-bodydark2">
                    Messages
                  </h5>
                </div>
                <ul className="flex h-auto flex-col overflow-y-auto">
                  <li>
                    <a
                      className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="/messages"
                    >
                      <div className="h-12.5 w-12.5 rounded-full">
                        <img
                          alt="User"
                          loading="lazy"
                          width={112}
                          height={112}
                          decoding="async"
                          data-nimg={1}
                          srcSet="/_next/image?url=%2Fimages%2Fuser%2Fuser-02.png&w=128&q=75 1x, /_next/image?url=%2Fimages%2Fuser%2Fuser-02.png&w=256&q=75 2x"
                          src="/_next/image?url=%2Fimages%2Fuser%2Fuser-02.png&w=256&q=75"
                          style={{
                            color: "transparent",
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-black dark:text-white">
                          Mariya Desoja
                        </h6>
                        <p className="text-sm">I like your confidence 💪</p>
                        <p className="text-xs">2min ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="/messages"
                    >
                      <div className="h-12.5 w-12.5 rounded-full">
                        <img
                          alt="User"
                          loading="lazy"
                          width={112}
                          height={112}
                          decoding="async"
                          data-nimg={1}
                          srcSet="/_next/image?url=%2Fimages%2Fuser%2Fuser-01.png&w=128&q=75 1x, /_next/image?url=%2Fimages%2Fuser%2Fuser-01.png&w=256&q=75 2x"
                          src="/_next/image?url=%2Fimages%2Fuser%2Fuser-01.png&w=256&q=75"
                          style={{
                            color: "transparent",
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-black dark:text-white">
                          Robert Jhon
                        </h6>
                        <p className="text-sm">Can you share your offer?</p>
                        <p className="text-xs">10min ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="/messages"
                    >
                      <div className="h-12.5 w-12.5 rounded-full">
                        <img
                          alt="User"
                          loading="lazy"
                          width={112}
                          height={112}
                          decoding="async"
                          data-nimg={1}
                          srcSet="/_next/image?url=%2Fimages%2Fuser%2Fuser-03.png&w=128&q=75 1x, /_next/image?url=%2Fimages%2Fuser%2Fuser-03.png&w=256&q=75 2x"
                          src="/_next/image?url=%2Fimages%2Fuser%2Fuser-03.png&w=256&q=75"
                          style={{
                            color: "transparent",
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-black dark:text-white">
                          Henry Dholi
                        </h6>
                        <p className="text-sm">
                          I cam across your profile and...
                        </p>
                        <p className="text-xs">1day ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="/messages"
                    >
                      <div className="h-12.5 w-12.5 rounded-full">
                        <img
                          alt="User"
                          loading="lazy"
                          width={112}
                          height={112}
                          decoding="async"
                          data-nimg={1}
                          srcSet="/_next/image?url=%2Fimages%2Fuser%2Fuser-04.png&w=128&q=75 1x, /_next/image?url=%2Fimages%2Fuser%2Fuser-04.png&w=256&q=75 2x"
                          src="/_next/image?url=%2Fimages%2Fuser%2Fuser-04.png&w=256&q=75"
                          style={{
                            color: "transparent",
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-black dark:text-white">
                          Cody Fisher
                        </h6>
                        <p className="text-sm">I’m waiting for you response!</p>
                        <p className="text-xs">5days ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="/messages"
                    >
                      <div className="h-12.5 w-12.5 rounded-full">
                        <Image
                          alt="User"
                          loading="lazy"
                          width={112}
                          height={112}
                          decoding="async"
                          data-nimg={1}
                          src="/_next/image?url=%2Fimages%2Fuser%2Fuser-02.png&w=256&q=75"
                          style={{
                            color: "transparent",
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-black dark:text-white">
                          {session?.user.username}
                        </h6>
                        <p className="text-sm">I like your confidence 💪</p>
                        <p className="text-xs">2min ago</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                  {session?.user.username}
                </span>
                <span className="block text-xs">UX Designer</span>
              </span>
              <span className="h-12 w-12 rounded-full relative">
                <Image
                  alt="User"
                  loading="lazy"
                  decoding="async"
                  data-nimg={1}
                  fill
                  className="object-cover rounded-full"
                  src={session?.user.image || ""}
                />
              </span>
              <Button onClick={() => signOut()} className="p-2 w-8 h-8">
                <LogOut size={18} />
              </Button>
              {/* <svg
                className="hidden fill-current sm:block"
                width={12}
                height={8}
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                  fill=""
                />
              </svg> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
