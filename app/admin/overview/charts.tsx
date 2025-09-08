"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import React from 'react'

export default function Charts({ data: { salesData } }: { data: { salesData: { month: string, totalSales: number }[] } }) {

    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={salesData}>
                <XAxis dataKey="month" stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `$${value}`} stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />

                <Bar dataKey="totalSales" fill='currentColor' radius={[4, 4, 0, 0]}
                    className='fill-primary' />
            </BarChart>
        </ResponsiveContainer>
    )
}