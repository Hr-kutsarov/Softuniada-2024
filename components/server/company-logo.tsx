import Image from "next/image";
import img from '@/app/brico-logo.png';
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CompanyLogoComponent() {
    return (
        <span className={cn('flex w-full h-full')}>
            <Link href='/'>
                <Image src={img} priority={true} alt='logo' />
            </Link>
        </span>
    )
}