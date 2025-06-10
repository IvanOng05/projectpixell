'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page') || 1);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Previous
        </Link>
      )}
      <span className="flex items-center px-4 py-2 text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}