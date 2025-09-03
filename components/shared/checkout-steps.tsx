import { cn } from '@/lib/utils'
import React, { Fragment } from 'react'

const steps = ["User Login", "Shipping Address", "Payment Method", "Place Order"]

export default function CheckoutSteps({ current = 0 }) {
    return (
        <div className='flex-between flex-row space-x-2 space-y-2 mb-10'>
            {steps.map((step, index) => (
                <Fragment key={step}>
                    <div className={
                        cn("p-2 w-56 rounded-full text-center text-sm",
                            index === current ? "bg-secondary" : "")
                    }>
                        {step}
                    </div>
                    {step !== "Place Order" && (
                        <hr className="w-16 border-t border-gray-300 mx-2" />
                    )}
                </Fragment>
            ))}
        </div>
    )
}
