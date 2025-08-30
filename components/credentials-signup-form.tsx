"use client";

import { SIGN_IN_DEFAULT_VALUES, SIGN_UP_DEFAULT_VALUES } from "@/lib/constants";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { signUpUser } from "@/lib/actions/user.actions";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const CredentialsSignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: "",
    });


    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callbackUrl") || "/";

    const SignUpButton = () => {
        const { pending } = useFormStatus();

        return <Button disabled={pending} className="w-full" variant="default">
            {pending ? "Signing Up..." : "Sign Up"}
        </Button>
    }

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callBackUrl} />

            <div className="space-y-6">
                <div className="">
                    <Label htmlFor="name" className="mb-1">Name</Label>
                    <Input id="name" name="name" type="emal" autoComplete="name"
                        defaultValue={SIGN_UP_DEFAULT_VALUES.name} required
                    />
                </div>

                <div className="">
                    <Label htmlFor="email" className="mb-1">Email</Label>
                    <Input id="email" name="email" type="emal" autoComplete="email"
                        defaultValue={SIGN_UP_DEFAULT_VALUES.email} required
                    />
                </div>

                <div className="">
                    <Label htmlFor="password" className="mb-1">Password</Label>
                    <Input id="password" name="password" type="password" autoComplete="password"
                        defaultValue={SIGN_UP_DEFAULT_VALUES.password} required
                    />
                </div>

                <div className="">
                    <Label htmlFor="confirmPassword" className="mb-1">Confirm Password</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="confirmPassword"
                        defaultValue={SIGN_UP_DEFAULT_VALUES.confirmPassword} required
                    />
                </div>

                <div className="">
                    <SignUpButton />
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}

                <div className="text-sm text-center text-muted-foreground">
                    Already have an account?
                    <Link href="/sign-up" target="_self" className="link text-primary"> Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default CredentialsSignUpForm;