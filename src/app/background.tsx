export function Background({ children }: { children: React.ReactNode }) {

    return (
        <div className="bg-light dark:bg-dark">
            {children}
        </div>)
}