const roudedInput = 'bg-gray-600 outline-none w-full h-8 p-2 rounded-lg mt-2 mb-4';

interface inputProps {
  inputStyle?: 'roudedInput';
  inputType?: 'email' | 'password' | 'text';
  placeHolder?: string;
  inputID: string;
}

const Input = ({ inputID, placeHolder = '', inputType = 'text', inputStyle = 'roudedInput' }: inputProps) => {
  const InputStyles = inputStyle === 'roudedInput' ? roudedInput : '';

  return <input type={inputType} placeholder={placeHolder} className={InputStyles} />;
};

export default Input;
