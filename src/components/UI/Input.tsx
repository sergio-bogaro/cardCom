import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

const inputProps = cva('p-2 rounded outline-none w-full', {
  variants: {
    styles: {
      primary: 'bg-gray-600',
      secondary: 'bg-transparent'
    },
    validator: {
      true: 'border border-red-700',
      false: ''
    }
  },
  defaultVariants: {
    styles: 'primary'
  }
});

interface Props extends InputProps, VariantProps<typeof inputProps> {
  label: string;
  fullWidth?: boolean;
}

export function Input({ styles, validator, fullWidth = true, label, ...Props }: Props) {
  const wrapperWidht = fullWidth ? 'w-full' : 'w-fit';

  return (
    <div className={wrapperWidht}>
      <p>{label}</p>

      <input className={inputProps({ styles, validator })} {...Props} />
    </div>
  );
}
