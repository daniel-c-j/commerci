import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import queryString from "query-string";

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

// Format errors. For ZOD we're not using safeParse, but using try catch instead
// since error/exception --ZOD or not-- will explicitly be globally handled in this
// single block of code.

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

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

export function formatCurrency(amount: number | string | null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  }

  if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  }

  return NaN;
}

// Shorten UUID
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// Format date and times
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  month: "short", // abbreviated month name (e.g., 'Oct')
  year: "numeric", // abbreviated month name (e.g., 'Oct')
  day: "numeric", // numeric day of the month (e.g., '25')
  hour: "numeric", // numeric hour (e.g., '8')
  minute: "numeric", // numeric minute (e.g., '30')
  hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
};
const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "short", // abbreviated weekday name (e.g., 'Mon')
  month: "short", // abbreviated month name (e.g., 'Oct')
  year: "numeric", // numeric year (e.g., '2023')
  day: "numeric", // numeric day of the month (e.g., '25')
};
const timeOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric", // numeric hour (e.g., '8')
  minute: "numeric", // numeric minute (e.g., '30')
  hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
};
export const formatDateTime = (dateString: Date) => {
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Form the pagination links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = queryString.parse(params);
  query[key] = value;

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    { skipNull: true }
  );
}

// Format number
const NUMBER_FORMATTER = Intl.NumberFormat("en-US");
export function formatNumber(number: number): string {
  return NUMBER_FORMATTER.format(number);
}
