
"use client";

import { approvePayPalOrder, createPayPalOrder } from "@/lib/actions/order.actions";
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "sonner";

export default function PayPalButtonsSection({ orderId, paypalClientId }: { orderId: string, paypalClientId: string }) {

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

    return <div>
        <PayPalScriptProvider options={{ clientId: paypalClientId }}>
            <PrintLoadingState />
            <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder} />
        </PayPalScriptProvider>
    </div>
}