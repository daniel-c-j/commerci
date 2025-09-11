"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateUser } from '@/lib/actions/user.actions'
import { USER_ROLES } from '@/lib/constants'
import { updateUserSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from "zod"

export default function UserUpdateForm({ user }: { user: z.infer<typeof updateUserSchema> }) {
    const router = useRouter()

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user
    })

    const onSubmit: SubmitHandler<z.infer<typeof updateUserSchema>> = async (values: z.infer<typeof updateUserSchema>) => {
        const res = await updateUser(values);
        if (!res.success) { toast.error(res.message); return; }
        toast(res.message)

        form.reset()
        router.push('/admin/users')
    }

    return (
        <Form {...form}>
            <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div >
                    {/* Name */}
                    <FormField control={form.control} name="name"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'name'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Name</FormLabel>

                                <FormControl>
                                    <Input placeholder='Enter username' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div>
                    {/* Email */}
                    <FormField control={form.control} name="email"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'email'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Email</FormLabel>

                                <FormControl>
                                    <Input placeholder='Enter email' {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div>
                    {/* Role */}
                    <FormField control={form.control} name="role"
                        render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'role'> }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Role</FormLabel>

                                <Select onValueChange={field.onChange} value={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        {USER_ROLES.map((role) => (
                                            <SelectItem key={role} value={role}>{role.charAt(0).toUpperCase()}{role.slice(1)}</SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>


                                <FormMessage />
                            </FormItem>
                        )} />
                </div>

                <div className='flex-between'>
                    {/* Submit */}
                    <Button type="submit" disabled={form.formState.isSubmitting} className='w-full'>
                        {form.formState.isSubmitting ? "Updating..." : "Update user"}
                    </Button>
                </div>

            </form>
        </Form>
    )
}
