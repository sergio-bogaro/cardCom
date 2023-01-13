import { ReactNode } from 'react';

const roundedButtonClassNames = 'bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-property: color';

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: 'default';
  buttonType?: 'submit' | 'button';
  children: ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ onClick, children, buttonStyle = 'default', buttonType = 'button' }: buttonProps) => {
  const ButtonStyle = buttonStyle === 'default' ? roundedButtonClassNames : '';

  return (
    <button className={ButtonStyle} type={buttonType} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
