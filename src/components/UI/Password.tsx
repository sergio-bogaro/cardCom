import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

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

export function Password({ styles, error, label, placeholder, name, value, onChange, fullWidth = true }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={fullWidth ? 'w-full' : 'w-fit'}>
      <p>{label}</p>

      <div className="relative flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          className={inputProps({ styles })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />

        <span className="absolute right-3 hover:cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <HiEye /> : <HiEyeOff />}
        </span>
      </div>

      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
}
