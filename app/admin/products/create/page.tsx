import { ProductFormCreate } from '@/app/admin/orders/product-form'
import { requireAdmin } from '@/lib/auth-guard';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Create Product"
}

export default async function CreateProductPage() {

    return (
        <>
            <h2 className="h2-bold">Create Product</h2>
            <div className="my-8">
                <ProductFormCreate />
            </div>
        </>
    )
}
