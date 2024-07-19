'use client'

import { ThemeProvider } from 'next-themes'
import ReactQueryProvider from "@/app/component/react_query_provider/react_query_provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme= 'system' enableSystem>
                {children}
            </ThemeProvider>
        </ReactQueryProvider>
    )
}