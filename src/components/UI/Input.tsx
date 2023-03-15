import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import InputMask from 'react-input-mask';

type InputProps = ComponentProps<'input'>;

const inputProps = cva('p-2 rounded outline-none w-full', {
  variants: {
    styles: {
      primary: 'bg-gray-600',
      secondary: 'bg-transparent'
    }
  },
  defaultVariants: {
    styles: 'primary'
  }
});

interface Props extends InputProps, VariantProps<typeof inputProps> {
  label: string;
  error?: string;
  mask?: string;
  fullWidth?: boolean;
}

export function Input({ styles, error, label, placeholder, name, value, onChange, mask = '', fullWidth = true }: Props) {
  return (
    <div className={fullWidth ? 'w-full' : 'w-fit'}>
      <p>{label}</p>

      <InputMask
        className={inputProps({ styles })}
        mask={mask}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
}
