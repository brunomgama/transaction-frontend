'use client'

import { TbSunHigh, TbMoon } from "react-icons/tb";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if(!mounted) {
        return (
            <div>
            </div>
        )
    }

    if (resolvedTheme === 'dark') {
        return < TbSunHigh onClick={() => setTheme('light')}/>
    }

    if (resolvedTheme === 'light') {
        return < TbMoon style={{color: "black"}} onClick={() => setTheme('dark')}/>
    }
}