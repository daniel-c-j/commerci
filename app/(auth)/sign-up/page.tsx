import { auth } from '@/auth';
import CredentialsSignUpForm from '@/app/(auth)/sign-up/credentials-signup-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'


export const metadata: Metadata = {
    title: "Sign Up",
};

export default async function SignUpPage(props: {
    searchParams: Promise<{ callbackUrl: string }>
}) {
    const { callbackUrl } = await props.searchParams;

    const session = await auth();
    if (session) return redirect(callbackUrl || "/");

    return (
        <div className='w-full max-w-md mx-auto'>
            <Card>
                <CardHeader>
                    <Link href='/' className='flex-center'>
                        <Image
                            priority={true}
                            src='/images/logo.svg'
                            width={100}
                            height={100}
                            alt={`${APP_NAME} logo`}
                        />
                    </Link>

                    <CardTitle className='text-center text-xl'>Create Account</CardTitle>

                    <CardDescription className='text-center'>
                        Enter your information below to sign up
                    </CardDescription>
                </CardHeader>

                <CardContent className='space-y-4'>
                    <CredentialsSignUpForm />
                </CardContent>
            </Card>
        </div>
    );
}

