import { ProductFormUpdate } from '@/app/admin/orders/product-form';
import { getProductById } from '@/lib/actions/product.actions';
import { requireAdmin } from '@/lib/auth-guard';
import { Metadata } from 'next'
import { notFound } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "Update Product"
}

export default async function AdminProductUpdatePage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    const product = await getProductById(id);
    if (!product) return notFound();

    return (
        <div className='space-y-8 max-w-5xl mx-auto'>
            <h1 className="h2-bold">Update Product</h1>

            <ProductFormUpdate product={product} productId={product.id} />
        </div>
    )
}
