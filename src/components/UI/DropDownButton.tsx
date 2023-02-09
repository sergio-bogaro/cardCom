import { ReactNode, useState } from 'react';
import { AiFillTool } from 'react-icons/ai';
import { FaBoxes, FaDollarSign } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';

import { ButtonOrLink } from '@ui/ButtonOrLink';

interface dropDownProps {
  icon?: 'person' | 'box' | 'money' | 'tool';
  children: ReactNode;
  title: string;
}

export const DropDownButton = ({ children, title, icon }: dropDownProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const buttonIcon =
    icon == 'person' ? (
      <MdPerson size={22} />
    ) : icon == 'box' ? (
      <FaBoxes size={22} />
    ) : icon == 'money' ? (
      <FaDollarSign size={22} />
    ) : icon == 'tool' ? (
      <AiFillTool size={22} />
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
      </ButtonOrLink>

      {modalContent}
    </div>
  );
};
