"use client"

import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import React from 'react'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import slugify from 'slugify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { toast } from 'sonner';

export function ProductFormCreate({ product, productId }: { product?: Product, productId?: string }) {
    const router = useRouter();
    // const updateFormHook = useForm<z.infer<typeof updateProductSchema>>({
    //     resolver: zodResolver(updateProductSchema),
    //     defaultValues: product || productDefaultValues,
    // });
    // const onSubmitUpdate: SubmitHandler<z.infer<typeof insertProductSchema>> = async (values) => {
    //     if (!productId) { router.push('/admin/products'); return; }

    //     const res = await updateProduct({ id: productId, ...values })
    //     if (!res.success) { toast.error(res.message); return; }

    //     toast(res.message);
    //     router.push('/admin/products')
    // }

    const form = useForm<z.infer<typeof insertProductSchema>>({
        resolver: zodResolver(insertProductSchema),
        defaultValues: productDefaultValues,
    });

    const onSubmitCreate: SubmitHandler<z.infer<typeof insertProductSchema>> = async (values) => {
        const res = await createProduct(values)
        if (!res.success) { toast.error(res.message); return; }

        toast(res.message);
        router.push('/admin/products')
    }

    return (
        <Form {...form}>
            <form method='POST' onSubmit={form.handleSubmit(onSubmitCreate)} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-5 items-start">
                    {/* Name */}
                    <FormField control={form.control} name="name"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Name</FormLabel>

                                <FormControl>
                                    <Input placeholder='Enter product name' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />

                    {/* Slug */}
                    <FormField control={form.control} name="slug"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Slug</FormLabel>

                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder='Enter slug' {...field} />
                                        <Button type="button" className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
                                            onClick={() => { form.setValue('slug', slugify(form.getValues('name'), { lower: true })) }}>
                                            Generate
                                        </Button>
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div className="flex flex-col md:flex-row gap-5 items-start">
                    {/* Catg */}
                    <FormField control={form.control} name="category"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'category'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Category</FormLabel>

                                <FormControl>
                                    <Input placeholder='Enter category name' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />

                    {/* Brand */}
                    <FormField control={form.control} name="brand"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Brand</FormLabel>

                                <FormControl>
                                    <Input placeholder='Enter brand name' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div className="flex flex-col md:flex-row gap-5 items-start">
                    {/* Price */}
                    <FormField control={form.control} name="price"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'price'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Price</FormLabel>

                                <FormControl>
                                    <Input placeholder='Enter price value' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />

                    {/* Stock */}
                    <FormField control={form.control} name="stock"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'stock'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Stock</FormLabel>

                                <FormControl>
                                    <Input placeholder='Enter stock value' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div className="upload-field flex flex-col md:flex-row gap-5 items-start">
                    {/* Images */}
                </div>

                <div className="upload-field">
                    {/* isFeatured */}
                </div>

                <div>
                    {/* Desc */}
                    <FormField control={form.control} name="description"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'description'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Description</FormLabel>

                                <FormControl>
                                    <Textarea placeholder='Enter description' {...field} className='resize-none' />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div>
                    {/* Submit */}
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className='button col-span-2 w-full'>
                        {form.formState.isSubmitting ? "Submitting" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
