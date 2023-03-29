import Link from 'next/link';
import { GoHome } from 'react-icons/go';

interface cardProps {
  cardTitle: string;
  quantity?: string;
}

export const Card = ({ cardTitle, quantity = '' }: cardProps) => {
  return (
    <Link href="" passHref>
      <div className="flex h-20 min-w-[200px] items-center gap-4 rounded-lg border border-solid p-4 border-gray-900 dark:border-gray-600  hover:bg-gray-600">
        <GoHome size={60} />
        <div>
          <p className="text-xs font-normal">{cardTitle}</p>
          <strong className="text-2xl">{quantity}</strong>
        </div>
      </div>
    </Link>
  );
};
