"use client";

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button';
import { toast } from 'sonner';

export default function DeleteDialog({ id, action }: { id: string, action: (id: string) => Promise<{ success: boolean, message: string }> }) {
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false);

    const handleDeleteClick = async () => {
        startTransition(async () => {
            const res = await action(id);
            if (!res.success) { toast.error(res.message); return; }

            setOpen(false);
            toast(res.message);
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive" className='ml-2'>
                    Delete
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <Button onClick={handleDeleteClick} variant="destructive" size="sm" disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
