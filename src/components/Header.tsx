import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GoBell, GoPerson } from 'react-icons/go';

import * as Popover from '@radix-ui/react-popover';

import { UserContext } from '../contexts/auth';
import styles from '../styles/radixPopover.module.css';

interface headerProps {
  title?: string;
}

const Header = ({ title = '' }: headerProps) => {
  const router = useRouter();
  const user = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('accessTokenCAP');
    router.push('/login');
  };
  return (
    <div className="flex w-full p-4 mb-4 border-transparent border-solid border-2 border-b-slate-900">
      <h2 className="text-2xl">{title}</h2>

      <div className="flex gap-4 ml-auto">
        <Popover.Root>
          <Popover.Trigger>
            <GoBell size={30} color={'gray'} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className={styles.PopoverContent} sideOffset={5} align="end">
              <p>Notificações</p>
              <Popover.Arrow className={styles.PopoverArrow} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <Popover.Root>
          <Popover.Trigger>
            <GoPerson size={30} color={'gray'} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className={styles.PopoverContent} sideOffset={5} align="end">
              <div className="flex flex-col gap-2 pb-2">
                <div className="flex flex-row gap-3 border border-transparent border-b-gray-600 mb-2 p-2">
                  <div className="bg-gray-300 p-1 rounded h-fit">
                    <GoPerson size={40} color={'gray'} />
                  </div>
                  <div className="mb-2">
                    <p>{user.nome}</p>
                    <p>{user.email}</p>
                  </div>
                </div>

                <Link className="w-full hover:bg-gray-300 pl-2" href="/home/conta">
                  Minha Conta
                </Link>
                <button className="w-full hover:bg-gray-300 text-left pl-2" onClick={logout}>
                  Sair
                </button>
              </div>

              <Popover.Arrow className={styles.PopoverArrow} />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
};

export default Header;
