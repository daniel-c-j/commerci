"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const routes = ['/admin/orders', '/admin/users', '/admin/products']

export default function AdminSearch() {

    const pathname = usePathname();
    const formActionUrl = routes.find(r => pathname.includes(r)) || '/admin/products';

    const searchParams = useSearchParams();
    const [queryValue, setQueryValue] = useState(searchParams.get('query') || "");

    useEffect(() => {
        setQueryValue(searchParams.get('query') || "")
    }, [searchParams])

    return (
        <form action={formActionUrl} method='GET'>
            <Input type="search" name="query" value={queryValue} placeholder="Search..." className="md:w-[100px] lg:w-[300px]"
                onChange={(e) => setQueryValue(e.target.value)} />

            <Button className='sr-only' type='submit'></Button>
        </form>
    )
}
