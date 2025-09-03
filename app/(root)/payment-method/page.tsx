import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'
import PaymentMethodForm from './payment-method-form';
import CheckoutSteps from '@/components/shared/checkout-steps';

export const metadata: Metadata = {
    title: "Select Payment Method",
};

export default async function PaymentMethodPage() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) redirect("/sign-in");
    const user = await getUserById(userId)

    return (
        <div>
            <CheckoutSteps current={2} />
            <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
        </div>
    )
}
