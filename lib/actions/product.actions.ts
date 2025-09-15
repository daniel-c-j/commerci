"use server";

import prisma from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { convertToPlainObj, formatError } from "../utils";
import { insertProductSchema, updateProductSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "../generated/prisma";

// Get latest products
export async function getLatestProducts() {
  try {
    const data = await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: "desc" },
    });

    return convertToPlainObj(data);
  } catch (e) {
    return [];
  }
}

// Get product by it's slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

export async function getProductById(id: string) {
  const data = await prisma.product.findFirst({
    where: { id },
  });
  return convertToPlainObj(data);
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  rating,
  sort,
  price,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  rating?: string;
  sort?: string;
  price?: string;
}) {
  // Query filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const catgFilter: Prisma.ProductWhereInput =
    category && category !== "all" ? { category } : {};

  // Price filter
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  // Rating filter
  const ratingFilter: Prisma.ProductWhereInput =
    rating && rating !== "all" ? { rating: { gte: Number(rating) } } : {};

  const data = await prisma.product.findMany({
    where: { ...queryFilter, ...catgFilter, ...priceFilter, ...ratingFilter },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return { data, totalPages: Math.ceil(dataCount / limit) };
}

// Create Product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    // Validate and create product
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update Product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    // Validate and find product
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error("Product not found");

    // Update product
    await prisma.product.update({ where: { id: product.id }, data: product });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Delete Product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all categories
export async function getAllProductCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObj(data);
}
