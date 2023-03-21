import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GoBell, GoPerson } from 'react-icons/go';

import * as Popover from '@radix-ui/react-popover';
import { ButtonOrLink } from '@ui/ButtonOrLink';

import { UserContext } from '../../contexts/auth';
import styles from '../../styles/radixPopover.module.css';
import { ThemeSwitcher } from './ThemeSwitcher';

const Header = () => {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('accessTokenCAP');
    localStorage.removeItem('userDataCAP');
    setUserData('');
    router.push('/login');
  };
  return (
    <div className="h-20 mb-4 flex p-4 bg-gray-300 dark:bg-slate-900">
      <div className="ml-auto flex gap-4 items-center">
        <ThemeSwitcher />

        <Popover.Root>
          <Popover.Trigger>
            <GoBell size={30} className="text-black dark:text-gray-300" />
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
            <GoPerson size={30} className="text-black dark:text-gray-300" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className={styles.PopoverContent} sideOffset={5} align="end">
              <div className="flex flex-col pb-2 text-black">
                <div className="mb-2 flex flex-row gap-3 p-2">
                  <div className="h-fit rounded bg-gray-300 p-1">
                    <GoPerson size={40} color={'gray'} />
                  </div>
                  <div className="mb-2">
                    <p>{userData.nome}</p>
                    <p>{userData.email}</p>
                  </div>
                </div>
                <Popover.Close asChild>
                  <ButtonOrLink intent={'transparent'} href="/home/conta" fullWidth>
                    Minha Conta
                  </ButtonOrLink>
                </Popover.Close>
                <Popover.Close asChild>
                  <ButtonOrLink intent={'transparent'} fullWidth onClick={logout}>
                    Sair
                  </ButtonOrLink>
                </Popover.Close>
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
