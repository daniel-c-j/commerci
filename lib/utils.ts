import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObj<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export default function formatNumberWithDecimal(num: number): string {
  const [intVal, floatVal] = num.toString().split(".");
  return floatVal ? `${intVal}.${floatVal.padEnd(2, "0")}` : `${intVal}.00`;
}
