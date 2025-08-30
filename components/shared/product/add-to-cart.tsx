"use client"

import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddToCart = ({ item }: { item: CartItem }) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        const res = await addItemToCart(item);
        if (!res.success) return toast.error(res.message);

        toast(`${item.name} added to cart`, {
            action:
                <Button title="Go To Cart" size="sm" onClick={() => router.push('/cart')}>
                    Go To Cart
                </Button>
        });
    }

    return (
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            <Plus /> Add to cart
        </Button>
    );
}

export default AddToCart;