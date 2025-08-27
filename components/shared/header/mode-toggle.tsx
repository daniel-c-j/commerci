'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuCheckboxItem, } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";

interface ThemeConf {
    code: string,
    title: string,
    icon: ReactElement,
}

const themes: ThemeConf[] = [
    { code: "light", title: "Light", icon: <SunIcon /> },
    { code: "dark", title: "Dark", icon: <MoonIcon /> },
    { code: "system", title: "System", icon: <SunMoon /> },
]

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // * To remove hydration error.
    useEffect(() => { setMounted(true); });
    if (!mounted) return null;

    return (<DropdownMenu>

        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                {themes.find((t) => t.code === theme)?.icon}
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {themes.map((t) =>
                <DropdownMenuCheckboxItem key={t.code} checked={theme === t.code} onClick={() => setTheme(t.code)}>
                    {t.title}
                </DropdownMenuCheckboxItem>
            )}
        </DropdownMenuContent>
    </DropdownMenu>);
}

export default ModeToggle;