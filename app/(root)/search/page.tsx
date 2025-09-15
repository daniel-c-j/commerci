import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import { getAllProductCategories, getAllProducts } from '@/lib/actions/product.actions';
import { Product } from '@/types';
import { Metadata } from 'next'
import Link from 'next/link';
import React from 'react'

const prices = [
    {
        name: "$1 to $50",
        value: "1-50"
    },
    {
        name: "$51 to $100",
        value: "51-100"
    },
    {
        name: "$101 to $200",
        value: "101-200"
    },
    {
        name: "$201 to $500",
        value: "201-500"
    },
    {
        name: "$501 to $1000",
        value: "501-1000"
    },
]

const ratings = [4, 3, 2, 1]

const sortOrders = ["newest", "lowest", "highest", "rating"]


export async function generateMetadata(props: {
    searchParams: Promise<{ q?: string, category?: string, price?: string, rating?: string, sort?: string, page?: string }>
}) {
    const { q = "all", category = "all", price = "all", rating = "all", sort = "newest", page = "1" } = await props.searchParams;

    const isQuerySet = q && q !== "all" && q.trim() !== "";
    const isCategorySet = category && category !== "all" && category.trim() !== "";
    const isPriceSet = price && price !== "all" && price.trim() !== "";
    const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

    if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
        return {
            title: `Search ${isQuerySet ? q : ""} ${isCategorySet ? `: Category ${category}` : ""}`
        }
    }

    return {
        title: "Search"
    }
}

export default async function SearchPage(props: {
    searchParams: Promise<{ q?: string, category?: string, price?: string, rating?: string, sort?: string, page?: string }>
}) {
    const { q = "all", category = "all", price = "all", rating = "all", sort = "newest", page = "1" } = await props.searchParams;

    // Construct filter url
    const getFilterUrl = ({ c, s, p, r, pg }: { c?: string, s?: string, p?: string, r?: string, pg?: string, }) => {
        const params = { q, category, price, rating, sort, page };
        if (c) params.category = c;
        if (s) params.sort = s;
        if (p) params.price = p;
        if (r) params.rating = r;
        if (pg) params.page = pg;

        return `/search?${new URLSearchParams(params).toString()}`
    };

    const products = await getAllProducts({
        query: q,
        category,
        price,
        rating,
        page: Number(page),
        sort,
    })

    const categories = await getAllProductCategories();

    return (
        <div className='grid md:grid-cols-5 md:gap-5'>
            <div className="filter-links">
                {/* Category Links */}
                <div className="text-xl mb-2 mt-3">Department</div>
                <div>
                    <ul className="space-y-1">
                        <li>
                            <Link className={`${(category === "all" || category === " ") && "font-bold"}`}
                                href={getFilterUrl({ c: "all" })}>
                                Any
                            </Link>
                        </li>

                        {categories.map((x) => (
                            <li key={x.category}>
                                <Link className={`${(category === x.category) && "font-bold"}`}
                                    href={getFilterUrl({ c: x.category })}>
                                    {x.category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Price Links */}
                <div className="text-xl mb-2 mt-5">Price</div>
                <div>
                    <ul className="space-y-1">
                        <li>
                            <Link className={`${(price === "all" || price === " ") && "font-bold"}`}
                                href={getFilterUrl({ p: "all" })}>
                                Any
                            </Link>
                        </li>

                        {prices.map((p) => (
                            <li key={p.value}>
                                <Link className={`${(price === p.value) && "font-bold"}`}
                                    href={getFilterUrl({ p: p.value })}>
                                    {p.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Rating Links */}
                <div className="text-xl mb-2 mt-5">Customer Ratings</div>
                <div>
                    <ul className="space-y-1">
                        <li>
                            <Link className={`${(rating === "all" || rating === " ") && "font-bold"}`}
                                href={getFilterUrl({ r: "all" })}>
                                Any
                            </Link>
                        </li>

                        {ratings.map((r) => (
                            <li key={r}>
                                <Link className={`${(r.toString() === rating) && "font-bold"}`}
                                    href={getFilterUrl({ r: r.toString() })}>
                                    {r} stars & up
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='md:col-span-4 space-y-4'>
                <div className="flex-between flex-col my-4 md:flex-row">
                    <div className="flex items-center">
                        {q !== "all" && q.trim() !== "" && "Searching for: " + q}

                        {category !== "all" && category.trim() !== "" && " Category: " + category}

                        {price !== "all" && price.trim() !== "" && " Price: " + price + "$"}

                        {rating !== "all" && rating.trim() !== "" && " Rating: " + rating + " stars & up"}

                        &nbsp;

                        {
                            (q !== "all" && q.trim() !== "") ||
                                (category !== "all" && category.trim() !== "") ||
                                (rating !== "all" && rating.trim() !== "") ||
                                (price !== "all" && price.trim() !== "") ? (

                                <Button variant={"link"} asChild>
                                    <Link href="/search">Clear</Link>
                                </Button>

                            ) : null
                        }
                    </div>

                    <div>
                        Sort by {" "}
                        {sortOrders.map((s) => (
                            <Link key={s} href={getFilterUrl({ s })} className={`mx-2 ${sort === s && "font-bold"}`}>
                                {s}
                            </Link>
                        ))}
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {products.data.length === 0 && <div>No products found</div>}

                    {products.data.map((product: Product) =>
                        (<ProductCard key={product.slug} product={product} />)
                    )}
                </div>

            </div>
        </div>
    )
}
