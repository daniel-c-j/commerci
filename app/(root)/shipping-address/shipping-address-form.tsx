"use client";

import { shippingAddressSchema } from "@/lib/validators";
import { ShippingAddress } from "@/types";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SHIPPING_ADDRESS_DEFAULT_VALUES } from "@/lib/constants";
import { useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.actions";
import { toast } from "sonner";


const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || SHIPPING_ADDRESS_DEFAULT_VALUES
    })

    const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values: z.infer<typeof shippingAddressSchema>) => {
        startTransition(async () => {
            const res = await updateUserAddress(values);
            if (!res.success) { toast.error(res.message); return; }

            router.push('/payment-method')
        })
    }

    return (
        <>
            <div className="max-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-muted-foreground">
                    Please enter and address to ship to.
                </p>

                <Form {...form}>
                    <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField control={form.control} name="fullName" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Full Name</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Full Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField control={form.control} name="streetAddress" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Street Name</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Street Name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField control={form.control} name="city" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
                                <FormItem className="w-full">
                                    <FormLabel>City</FormLabel>

                                    <FormControl>
                                        <Input placeholder="City" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField control={form.control} name="country" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Country</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Country" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}>

                            </FormField>
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <FormField control={form.control} name="postalCode" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Postal Code</FormLabel>

                                    <FormControl>
                                        <Input placeholder="Postal Code" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={isPending}>
                                {isPending ?
                                    (<Loader className="size-4 animate-spin" />) :
                                    (<ArrowRight className="size-4" />)
                                } Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}

export default ShippingAddressForm;