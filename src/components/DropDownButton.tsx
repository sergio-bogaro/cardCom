import { ReactNode, useState } from 'react';
import { GoPerson } from 'react-icons/go';

import { ButtonOrLink } from '@ui/ButtonOrLink';

interface dropDownProps {
  icon?: 'person';
  children: ReactNode;
  title: string;
}

export const DropDownButton = ({ children, title, icon }: dropDownProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const buttonIcon = icon == 'person' ? <GoPerson /> : '';

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
