import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GoHome } from 'react-icons/go';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { MdHome, MdHomeFilled } from 'react-icons/md';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { DropDownButton } from '@ui/DropDownButton';
import { CreateClientModal } from '@ui/Modal/CreateClient';
import { CreateModelsModal } from '@ui/Modal/Models';

import logoImage from '../../../public/logo.png';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (isOpen)
    return (
      <>
        <div className="fixed z-10 h-full w-1/4 min-w-[280px] max-w-[350px] overflow-auto rounded-lg bg-slate-900 p-5 text-gray-300 lg:static ">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 border-2 border-transparent border-b-slate-800">
              <Link href="/home">
                <Image className="mx-auto mb-6" src={logoImage} alt={'Logo do Site'} />
              </Link>

              <ButtonOrLink intent={'transparent'} onClick={() => setIsOpen(false)}>
                <HiArrowLeft />
              </ButtonOrLink>
            </div>

            <ButtonOrLink href="/home" fullWidth>
              <MdHomeFilled size={22} />
              Pagina Inicial
            </ButtonOrLink>

            <DropDownButton icon="temple" title="Administração">
              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
                • Cadastros
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Usuários
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Níveis
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton title="Auto Atendimento">
              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
                • Fazer Pedido
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton icon="people" title="Clientes e Pedidos">
              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
                • Zerar Saldo
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton icon="person" title="Clientes">
              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
                • Listar Clientes
              </ButtonOrLink>
              <CreateClientModal text="• Cadastrar Cliente" buttonIntent={'transparent'} />

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

            <DropDownButton icon="money" title="Comercial">
              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
                • Vendas
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton icon="cart" title="Pedidos">
              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
                • Fazer Pedido Manual
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Cortes Automaticos
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Listar Solicitações
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Listar Pedidos
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Ordens de Producao
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Grade de Producao
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton icon="table" title="Expedição">
              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
                • Entregas
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Confirmar Entregas
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
                • Expedir
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton icon="box" title="Estoque e Produtos">
              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Meu Estoque
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Transportadoras
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Fornecedores
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Ordem de compras
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Requisição de materiais
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Controle de estoque
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Produtos
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton icon="money" title="Financeiro">
              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Vendas Pendentes
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Boletos
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Librar Pedidos
              </ButtonOrLink>

              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Contas
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton title="Relatórios">
              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • Produção
              </ButtonOrLink>
            </DropDownButton>

            <DropDownButton icon="tool" title="Ferramentas">
              <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
                • WhatsApp
              </ButtonOrLink>
            </DropDownButton>
          </div>
        </div>
        <div
          id="wrapper"
          className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-25 text-black backdrop-blur-sm lg:hidden"
        />
      </>
    );

  return (
    <div className="absolute text-white">
      <ButtonOrLink intent={'transparent'} onClick={() => setIsOpen(true)}>
        <HiArrowRight />
      </ButtonOrLink>
    </div>
  );
};

export default SideBar;
