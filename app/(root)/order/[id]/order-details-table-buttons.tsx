
"use client";

import { Button } from "@/components/ui/button";
import { approvePayPalOrder, createPayPalOrder, deliverOrder, updateOrderToPaidCOD } from "@/lib/actions/order.actions";
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useTransition } from "react";
import { toast } from "sonner";

export function PayPalButtonsSection({ orderId, paypalClientId }: { orderId: string, paypalClientId: string }) {

    const PrintLoadingState = () => {
        const [{ isPending, isRejected }] = usePayPalScriptReducer()
        let status = "";

        if (isPending) status = "Loading PayPal...";
        else if (isRejected) status = "Error Loading Paypal";
        return status;
    }

    const handleCreatePayPalOrder = async () => {
        const res = await createPayPalOrder(orderId)

        if (!res.success) { toast.error(res.message); return; }
        return res.data;
    }

    const handleApprovePayPalOrder = async (data: { orderID: string }) => {
        const res = await approvePayPalOrder(orderId, data)

        if (!res.success) { toast.error(res.message); return; }
        toast(res.message);
    }

    return (
        <PayPalScriptProvider options={{ clientId: paypalClientId }}>
            <PrintLoadingState />
            <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder} />
        </PayPalScriptProvider>
    )
}

export function MarkAsPaidButton({ orderId }: { orderId: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <Button onClick={() => {
            startTransition(async () => {
                const res = await updateOrderToPaidCOD(orderId);
                if (!res.success) { toast.error(res.message); return; }
                toast(res.message)
            })
        }} type="button" disabled={isPending}>
            {isPending ? "Processing..." : "Mark As Paid"}
        </Button>
    )
}


export function MarkAsDeliveredButton({ orderId }: { orderId: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <Button onClick={() => {
            startTransition(async () => {
                const res = await deliverOrder(orderId);
                if (!res.success) { toast.error(res.message); return; }
                toast(res.message)
            })
        }} type="button" disabled={isPending}>
            {isPending ? "Processing..." : "Mark As Delivered"}
        </Button>
    )
}