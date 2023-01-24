import Link from 'next/link';
import { GoHome } from 'react-icons/go';

interface cardProps {
  cardTitle: string;
  quantity?: string;
}

export const Card = ({ cardTitle, quantity = '' }: cardProps) => {
  return (
    <Link href="">
      <div className="flex h-20 min-w-[250px] items-center gap-4 rounded-lg border-[1px] border-solid border-gray-600 p-4 text-gray-400 hover:bg-gray-600">
        <GoHome size={60} />
        <div>
          <p className="text-xs font-normal">{cardTitle}</p>
          <strong className="text-2xl text-gray-200">{quantity}</strong>
        </div>
      </div>
    </Link>
  );
};
