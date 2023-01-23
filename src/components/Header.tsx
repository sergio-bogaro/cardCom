import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GoBell, GoPerson } from 'react-icons/go';

import * as Popover from '@radix-ui/react-popover';
import { ButtonOrLink } from '@ui/ButtonOrLink';

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
    <div className="mb-4 flex w-full border-2 border-solid border-transparent border-b-slate-900 p-4">
      <h2 className="text-2xl">{title}</h2>

      <div className="ml-auto flex gap-4">
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
              <div className="flex flex-col pb-2">
                <div className="mb-2 flex flex-row gap-3 border border-transparent border-b-gray-600 p-2">
                  <div className="h-fit rounded bg-gray-300 p-1">
                    <GoPerson size={40} color={'gray'} />
                  </div>
                  <div className="mb-2">
                    <p>{user.nome}</p>
                    <p>{user.email}</p>
                  </div>
                </div>

                <ButtonOrLink intent={'transparent'} href="/home/conta" fullWidth>
                  Minha Conta
                </ButtonOrLink>

                <ButtonOrLink intent={'transparent'} fullWidth onClick={logout}>
                  Sair
                </ButtonOrLink>
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
