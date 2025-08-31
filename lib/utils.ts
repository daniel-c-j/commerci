import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPlainObj<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [intVal, floatVal] = num.toString().split(".");
  return floatVal ? `${intVal}.${floatVal.padEnd(2, "0")}` : `${intVal}.00`;
}

// format Errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error instanceof ZodError) {
    return error.issues.map((i) => `${i.message}`).join("\n");
  }

  if (
    error?.name === "PrismaClientKnownRequestError" &&
    error?.code === "P2002"
  ) {
    const field: string = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Other
  return typeof error.message === "string"
    ? error.message
    : JSON.stringify(error.message);
}

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or a string");
  }
}
