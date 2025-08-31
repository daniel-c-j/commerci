"use client"

import { Minus, Plus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = async () => {
        startTransition(async () => {
            const res = await addItemToCart(item);
            if (!res.success) { toast.error(res.message); return; }

            toast(res.message, {
                action:
                    <Button title="Go To Cart" size="sm" onClick={() => router.push('/cart')}>
                        Go To Cart
                    </Button>
            });
        });
    }

    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);
            if (!res.success) { toast.error(res.message); return; }

            toast(res.message, {
                action:
                    <Button title="Go To Cart" size="sm" onClick={() => router.push('/cart')}>
                        Go To Cart
                    </Button>
            });
        });
    }

    // Check if item is in cart
    const existItem = cart && cart?.items.find((x) => x.productId === item.productId);

    return existItem ? (
        <div>
            <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
                {isPending ? (<Loader className="size-4 animate-spin" />) : (<Minus className="size-4" />)}
            </Button>
            <span className="px-2">
                {existItem.qty}
            </span>
            <Button type="button" variant="outline" onClick={handleAddToCart}>
                {isPending ? (<Loader className="size-4 animate-spin" />) : (<Plus />)}

            </Button>
        </div>

    ) : (
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            {isPending ? (<Loader className="size-4 animate-spin" />) : (<Plus />)}
            Add to cart
        </Button>
    );


}

export default AddToCart;