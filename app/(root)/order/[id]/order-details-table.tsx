import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import { Order } from '@/types'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderDetailsTable({ order }: { order: Order }) {
    const { shippingAddress, shippingPrice, itemsPrice, taxPrice, orderitems, totalPrice, paymentMethod, isDelivered, isPaid, id, paidAt, deliveredAt, } = order;

    return (
        <div>
            <h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
            <div className="grid md:grid-cols-3 md:gap-5">
                <div className="col-span-2 space-y-4 overflow-x-auto">
                    <Card>
                        <CardContent className='gap-4'>
                            <h2 className="text-xl pb-4">Payment Method</h2>
                            <p>{paymentMethod}</p>

                            {isPaid ?
                                (<Badge variant="secondary">
                                    Paid at {formatDateTime(paidAt!).dateTime}
                                </Badge>)
                                : (<Badge variant="destructive">
                                    Not paid
                                </Badge>)
                            }
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className='gap-4'>
                            <h2 className="text-xl pb-4">Shipping Address</h2>
                            <p>{shippingAddress.fullName}</p>
                            <p>
                                {shippingAddress.streetAddress}, {shippingAddress.city} {" "}
                                {shippingAddress.postalCode},  {shippingAddress.country}
                            </p>

                            {isDelivered ?
                                (<Badge variant="secondary">
                                    Delivered at {formatDateTime(paidAt!).dateTime}
                                </Badge>)
                                : (<Badge variant="destructive">
                                    Not delivered
                                </Badge>)
                            }
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="gap-4">
                            <h2 className="text-xl pb-4">Order Items</h2>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead className='text-right'>Price</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {orderitems.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell>
                                                <Link href={`/product/${item.slug}`} className='flex items-center'>
                                                    <Image src={item.image} alt={item.name} width={50} height={50} />
                                                    <span className="px-2">{item.name}</span>
                                                </Link>
                                            </TableCell>

                                            <TableCell>
                                                <span className="px-2">{item.qty}</span>
                                            </TableCell>

                                            <TableCell className='text-right'>
                                                ${item.price}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardContent className='gap-4 space-y-4'>
                            <div className="flex justify-between">
                                <div className="">Items</div>
                                <div className="">{formatCurrency(itemsPrice)}</div>
                            </div>

                            <div className="flex justify-between">
                                <div className="">Tax</div>
                                <div className="">{formatCurrency(taxPrice)}</div>
                            </div>

                            <div className="flex justify-between">
                                <div className="">Shipping</div>
                                <div className="">{formatCurrency(shippingPrice)}</div>
                            </div>

                            <hr />

                            <div className="flex justify-between font-semibold">
                                <div className="">Total</div>
                                <div className="">{formatCurrency(totalPrice)}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
