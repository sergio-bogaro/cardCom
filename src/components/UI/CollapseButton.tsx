import { ReactNode, useState } from 'react';
import { AiFillTool } from 'react-icons/ai';
import { FaBoxes, FaDollarSign, FaShoppingCart, FaTable } from 'react-icons/fa';
import { GiGreekTemple } from 'react-icons/gi';
import { HiDocumentReport } from 'react-icons/hi';
import { MdPeople, MdPerson } from 'react-icons/md';
import { RiArrowDropDownFill } from 'react-icons/ri';

import { ButtonOrLink } from '@ui/ButtonOrLink';

interface dropDownProps {
  icon?: 'person' | 'people' | 'box' | 'money' | 'tool' | 'cart' | 'temple' | 'table' | 'report' 
  title: string;
  isOpen: string;
  setIsOpen: any;
  children: ReactNode;
}

export const CollapseButton = ({ children, title, icon, isOpen, setIsOpen }: dropDownProps) => {
  const opened = isOpen === title

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
    ) : icon === 'report' ? (
      <HiDocumentReport size={22} />
    )
    :(
      ''
    );

  function handleMenuOpen() {
    if (!opened) setIsOpen(title)
    else setIsOpen("")
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className={`${opened ? 'bg-gray-600' : ''}`}>
        <ButtonOrLink intent={'transparent'} fullWidth onClick={handleMenuOpen}>
          {buttonIcon}
          {title}
          <div className={`ml-auto duration-150 ease-in-out ${opened ? '-rotate-180' : 'rotate-0'}`}>
            <RiArrowDropDownFill size={22} />
          </div>
        </ButtonOrLink>
      </div>
      <div
        className={`flex w-full flex-col gap-2 overflow-hidden transition-height duration-300 ease-in-out ${
          opened ? 'max-h-96 shadow-lg' : ' max-h-0'
        }`}>
        {children}
      </div>
    </div>
  );
};
