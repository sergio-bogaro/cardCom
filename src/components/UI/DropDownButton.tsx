import { ReactNode, useState } from 'react';
import { AiFillTool } from 'react-icons/ai';
import { FaBoxes, FaDollarSign, FaShoppingCart, FaTable } from 'react-icons/fa';
import { GiGreekTemple } from 'react-icons/gi';
import { MdPeople, MdPerson } from 'react-icons/md';
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri';

import { ButtonOrLink } from '@ui/ButtonOrLink';

interface dropDownProps {
  icon?: 'person' | 'people' | 'box' | 'money' | 'tool' | 'cart' | 'temple' | 'table';
  title: string;
  children: ReactNode;
}

export const DropDownButton = ({ children, title, icon }: dropDownProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const buttonIcon =
    icon == 'person' ? (
      <MdPerson size={22} />
    ) : icon == 'people' ? (
      <MdPeople size={22} />
    ) : icon == 'box' ? (
      <FaBoxes size={22} />
    ) : icon == 'temple' ? (
      <GiGreekTemple size={22} />
    ) : icon == 'table' ? (
      <FaTable size={22} />
    ) : icon == 'money' ? (
      <FaDollarSign size={22} />
    ) : icon == 'tool' ? (
      <AiFillTool size={22} />
    ) : icon == 'cart' ? (
      <FaShoppingCart />
    ) : (
      ''
    );

  function handleMenuOpen() {
    setModalOpen(!modalOpen);
  }

  const modalContent = modalOpen ? <div className="flex w-full flex-col gap-2 py-2">{children}</div> : null;

  return (
    <div className="w-full">
      <ButtonOrLink intent={'primary'} fullWidth onClick={handleMenuOpen}>
        {buttonIcon}
        {title}
        <div className="ml-auto">{modalOpen ? <RiArrowDropUpFill size={22} /> : <RiArrowDropDownFill size={22} />}</div>
      </ButtonOrLink>

      {modalContent}
    </div>
  );
};
