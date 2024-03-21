export const Footer = () => {
    return (
        <div className="z-10 w-full items-center justify-between font-mono text-sm">
            <div className="bottom-0 left-0 p-6 flex h-48 w-full items-end justify-center bg-gradient-to-t from-slate-700 via-neutral-100 dark:from-black dark:via-black">
                <div
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                >
                    © 2024 {" "}
                    
                    <p className="font-bold font-serif italic text-lg md:text-xl lg:text-2xl xl:text-3xl">
                        Bright Rikin
                    </p>
                </div>
            </div>
        </div>
    );
}