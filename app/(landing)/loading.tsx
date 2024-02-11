import { cn } from "@/lib/utils";

export default function LoadingPage() {

    return (
        <main className='flex flex-col items-center justify-center bg-zinc-100'>
            <h1 className={cn('text-4xl text-red-800')}>Loading</h1>
            
        </main>
    )
}