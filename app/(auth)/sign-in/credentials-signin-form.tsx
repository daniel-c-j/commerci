"use client";

import { SIGN_IN_DEFAULT_VALUES } from "@/lib/constants";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: "",
    });


    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callbackUrl") || "/";

    const SignInButton = () => {
        const { pending } = useFormStatus();

        return <Button disabled={pending} className="w-full" variant="default">
            {pending ? "Signing In..." : "Sign In"}
        </Button>
    }

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callBackUrl} />

            <div className="space-y-6">
                <div className="">
                    <Label htmlFor="email" className="mb-1">Email</Label>
                    <Input id="email" name="email" type="emal" autoComplete="email"
                        defaultValue={SIGN_IN_DEFAULT_VALUES.email} required
                    />
                </div>

                <div className="">
                    <Label htmlFor="password" className="mb-1">Password</Label>
                    <Input id="password" name="password" type="password" autoComplete="password"
                        defaultValue={SIGN_IN_DEFAULT_VALUES.password} required
                    />
                </div>

                <div className="">
                    <SignInButton />
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}

                <div className="text-sm text-center text-muted-foreground">
                    Do not have an account?
                    <Link href="/sign-up" target="_self" className="link text-primary"> Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default CredentialsSignInForm;