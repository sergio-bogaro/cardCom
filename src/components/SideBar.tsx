import Image from 'next/image';
import Link from 'next/link';
import { GoHome } from 'react-icons/go';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { CreateClientModal } from '@ui/Modal/Client';
import { CreateModelsModal } from '@ui/Modal/Models';

import logoImage from '../../public/logo.png';
import { DropDownButton } from './DropDownButton';

const SideBar = () => {
  return (
    <div className="w-1/4 min-w-[280px] max-w-[350px] rounded-lg bg-slate-900 p-3 text-gray-300">
      <div className="mx-auto flex w-4/5 flex-col items-center gap-4">
        <Link href="/home">
          <Image className="my-6 mx-auto" src={logoImage} alt={'Logo do Site'} />
        </Link>

        <ButtonOrLink href="/home" fullWidth>
          <GoHome size={20} />
          Pagina Inicial
        </ButtonOrLink>

        <DropDownButton icon="person" title="Clientes">
          <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
            • Listar Clientes
          </ButtonOrLink>
          <CreateClientModal text="• Cadastrar Cliente" />

          <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
            • Saldo dos Clientes
          </ButtonOrLink>
        </DropDownButton>

        <DropDownButton icon="person" title="Modelos">
          <ButtonOrLink intent={'transparent'} fullWidth href="/modelos/listar">
            • Listar Modelos
          </ButtonOrLink>

          <CreateModelsModal text="• Cadastrar Modelo" />

          <ButtonOrLink intent={'transparent'} fullWidth href="/modelos/saldo">
            • Saldo dos Modelos
          </ButtonOrLink>
        </DropDownButton>

        <DropDownButton icon="person" title="Estoque e Produtos">
          <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
            • Produtos
          </ButtonOrLink>
        </DropDownButton>
      </div>
    </div>
  );
};

export default SideBar;
