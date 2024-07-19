export function Background({ children }: { children: React.ReactNode }) {

    return (
        <div className="h-full min-h-screen bg-light dark:bg-dark">
            {children}
        </div>)
}