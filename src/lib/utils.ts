import { Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const JsonToArray = (value: string) => {
  if (value) return JSON.parse(value.replace(/'/g, '"'));
  else return [];
};

type TlocalStorageDB = {
  status: "ADD" | "REMOVE" | "UPDATE" | "GET";
  name: string;
  data?: any;
};
export const localStorageDB = ({
  status,
  name,
  data,
}: TlocalStorageDB): any => {
  if (name) {
    let value = null;

    if (status === "ADD") {
      value = localStorage.getItem(name);
      if (!value) {
        localStorage.setItem(name, data);
      }
    } else if (status === "GET") {
      value = localStorage.getItem(name);
      if (value) {
        return value;
      } else {
        return null;
      }
    } else if (status === "UPDATE") {
      value = localStorage.getItem(name);
      if (value) {
        localStorage.setItem("cart", data);
      } else {
      }
    }
  }
};

export const isInArray = (value: any, array: any[]) => {
  return array.includes(value);
};
export const shallowEqualityCheck = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};

export const mergeArrays = (arrays: any, prop: any) => {
  const merged: any = {};

  arrays.forEach((arr: any) => {
    arr.forEach((item: any) => {
      merged[item[prop]] = Object.assign({}, merged[item[prop]], item);
    });
  });

  return Object.values(merged);
};

export const formatPriceVND = (value: number) => {
  let x: number | string = value;
  x = x.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  return x;
};

export const discountPrice = (value: number, discount: number) => {
  const result_discount = discount / 100;
  let total_price_discount = 0;
  total_price_discount = value - value * result_discount;
  return total_price_discount;
};

export const getUrlExtension = (url: any) => {
  if (url) return url.split(/[#?]/)[0].split(".").pop().trim();
};
