import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { ComponentProps } from 'react';

type ButtonOrLinkProps = ComponentProps<'button'> & ComponentProps<'a'>;

const buttonProps = cva(
  'flex items-center py-2 px-4 gap-2 rounded focus:outline-none transition-all disabled:opacity-60 focus:ring-offset-black focus:ring-offset-1 disabled:pointer-events-none hover:bg-opacity-80 ',
  {
    variants: {
      intent: {
        primary: 'bg-gray-600 hover:bg-gray-700',
        secondary: 'bg-blue-600 hover:bg-blue-700',
        dangeer: 'bg-red-600 hover:bg-red-700',
        transparent: 'bg-transparent hover:bg-gray-500'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit'
      }
    },
    defaultVariants: {
      intent: 'primary',
      fullWidth: false
    }
  }
);

interface Props extends ButtonOrLinkProps, VariantProps<typeof buttonProps> {}

export function ButtonOrLink({ intent, fullWidth, href, children, onClick }: Props) {
  const isLink = typeof href !== 'undefined';

  if (isLink) {
    return (
      <Link className={buttonProps({ intent, fullWidth })} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonProps({ intent, fullWidth })} onClick={onClick}>
      {children}
    </button>
  );
}
