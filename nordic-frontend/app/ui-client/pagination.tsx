'use client';

import Link from 'next/link';

import { usePathname, useSearchParams } from 'next/navigation';


export default function Pagination({ count }: {count: number}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
    <ul className="pagination-list">
        <li className="previous">
        { 
            currentPage <= 1 ?  //disabled
            <div>‹</div>
            : 
            <Link href={createPageURL(currentPage - 1)}>‹</Link>
        }
        </li>
        <li ><span>{currentPage}</span></li>
        <li className="next">
        { 
            currentPage >= count ?  //disabled
            <div>›</div>
            : 
            <Link href={createPageURL(currentPage + 1)}>›</Link>
        }          
        </li>
    </ul>

    );
}