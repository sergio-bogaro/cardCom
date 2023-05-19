import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GoThreeBars, GoX } from 'react-icons/go';
import { MdHomeFilled } from 'react-icons/md';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { CollapseButton } from '@ui/CollapseButton';

import logoImage from '../../../public/logo.png';
import { SidebarContent } from '../layout/SidebarContent';

export const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [collapsableOpen, setCollapsableOpen] = useState('');

  return (
    <main>
      <div
        className={`top-0 h-full w-[250px] fixed overflow-auto bg-gray-200 duration-300 ease-in-out
                scrollbar-thin scrollbar-track-inherit scrollbar-thumb-slate-700 dark:bg-slate-800 shadow-2xl
                ${isOpen ? 'translate-x-0' : 'fixed -translate-x-full'}`}>
        <div className="flex flex-col items-center gap-2 ">
          <div className="flex h-16 w-full justify-around p-2 bg-gray-600 shadow-lg dark:bg-slate-900 dark:shadow-slate-850">
            <Link className="-mt-1" href="/home">
              <Image src={logoImage} alt={'Logo do Site'} height={45} />
            </Link>

            <button className="absolute right-0 top-0 p-2">
              <GoX size={25} onClick={() => setIsOpen(false)} />
            </button>
          </div>

          <SidebarContent />
        </div>
      </div>

      {!isOpen ? (
        <button className="absolute p-4 text-white z-10" onClick={() => setIsOpen(true)}>
          <GoThreeBars size={25} />
        </button>
      ) : (
        ''
      )}
    </main>
  );
};
