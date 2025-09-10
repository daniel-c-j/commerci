import { ProductFormCreate } from '@/components/admin/product-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Create Product"
}

export default function CreateProductPage() {
    return (
        <>
            <h2 className="h2-bold">Create Product</h2>
            <div className="my-8">
                <ProductFormCreate />
            </div>
        </>
    )
}
