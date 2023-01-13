import { ReactNode, useState } from 'react';
import { GoBell, GoPerson } from 'react-icons/go';

interface dropDownProps {
  icon?: 'person';
  children: ReactNode;
  title: string;
}

const DropDownButton = ({ children, title, icon }: dropDownProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const buttonIcon = icon == 'person' ? <GoPerson /> : '';

  function handleMenuOpen() {
    setModalOpen(!modalOpen);
  }

  return (
    <div className="flex gap-2 flex-col">
      <button onClick={handleMenuOpen} className="bg-gray-700 hover:bg-gray-500 w-4/5 h-10 pl-4 rounded-lg flex gap-2 items-center mx-auto">
        {buttonIcon}
        {title}
      </button>

      <div style={{ display: modalOpen ? 'block' : 'none' }}>{children}</div>
    </div>
  );
};

export default DropDownButton;
