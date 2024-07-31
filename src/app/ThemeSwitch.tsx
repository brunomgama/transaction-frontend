'use client'

import { useEffect, useState } from 'react';
import { TbSunHigh, TbMoon } from 'react-icons/tb'; // make sure to import the icons
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if(!mounted) {
        return (
            <div>
            </div>
        )
    }

    if (resolvedTheme === 'dark') {
        return <TbSunHigh className="h-6 w-6 mt-2 cursor-pointer" onClick={() => setTheme('light')} />;
    }

    if (resolvedTheme === 'light') {
        return <TbMoon className={`h-6 w-6 mt-2 cursor-pointer text-black`} onClick={() => setTheme('dark')} />;
    }
}