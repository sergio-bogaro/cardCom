import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GoThreeBars, GoX } from 'react-icons/go';
import { MdHomeFilled } from 'react-icons/md';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { DropDownButton } from '@ui/DropDownButton';

import logoImage from '../../../public/logo.png';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main>
      <div
        className={`top-0 h-full min-w-[300px] overflow-auto bg-gray-300 text-black transition-all duration-300 ease-in-out
        scrollbar-thin scrollbar-track-inherit scrollbar-thumb-slate-700 dark:bg-slate-850 dark:text-white
        ${isOpen ? 'fixed translate-x-0 lg:relative' : 'fixed -translate-x-full'}`}>
        <div className="flex flex-col items-center gap-2 ">
          <div className="flex h-20 w-full justify-around bg-gray-300 shadow-lg dark:bg-slate-900">
            <Link href="/home">
              <Image src={logoImage} alt={'Logo do Site'} height={60} />
            </Link>

            <button className="absolute right-0 top-0 p-2">
              <GoX size={25} onClick={() => setIsOpen(false)} />
            </button>
          </div>

          <div className="mb-2 w-full">
            <ButtonOrLink intent={'transparent'} href="/home" fullWidth>
              <MdHomeFilled size={22} />
              Pagina Inicial
            </ButtonOrLink>
          </div>

          <DropDownButton icon="temple" title="Administração">
            <ButtonOrLink intent={'transparent'} fullWidth href="/administracao/cadastros">
              • Cadastros
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/administracao/usuarios">
              • Usuários
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/administracao/niveis">
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

            <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
              • Saldo dos Clientes
            </ButtonOrLink>
          </DropDownButton>

          <DropDownButton icon="person" title="Modelos">
            <ButtonOrLink intent={'transparent'} fullWidth href="/modelos/listar">
              • Listar Modelos
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/modelos/saldo">
              • Saldo dos Modelos
            </ButtonOrLink>
          </DropDownButton>

          <DropDownButton icon="money" title="Comercial">
            <ButtonOrLink intent={'transparent'} fullWidth href="/comercial/vendas">
              • Vendas
            </ButtonOrLink>
          </DropDownButton>

          <DropDownButton icon="cart" title="Pedidos">
            <ButtonOrLink intent={'transparent'} fullWidth href="/pedidos/criar-pedido">
              • Fazer Pedido
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/pedidos/cortes">
              • Cortes Automaticos
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/pedidos/solicitacoes">
              • Listar Solicitações
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/pedidos/listar">
              • Listar Pedidos
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/pedidos/pendentes">
              • Pedidos Pendentes
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/pedidos/ordem-producao">
              • Ordens de Producao
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/pedidos/grade-producao">
              • Grade de Producao
            </ButtonOrLink>
          </DropDownButton>

          <DropDownButton icon="table" title="Expedição">
            <ButtonOrLink intent={'transparent'} fullWidth href="/expedicao/entregas">
              • Entregas
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/expedicao/confirmar-entregas">
              • Confirmar Entregas
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/expedicao/expedir">
              • Expedir
            </ButtonOrLink>
          </DropDownButton>

          <DropDownButton icon="box" title="Estoque e Produtos">
            <ButtonOrLink intent={'transparent'} fullWidth href="/estoque/meu-estoque">
              • Meu Estoque
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/estoque/transportadoras">
              • Transportadoras
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/estoque/fornecedores">
              • Fornecedores
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/estoque/ordem-compras">
              • Ordem de compras
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/estoque/requisicao-materiais">
              • Requisição de materiais
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/estoque/controle-estoque">
              • Controle de estoque
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/estoque/produtos">
              • Produtos
            </ButtonOrLink>
          </DropDownButton>

          <DropDownButton icon="money" title="Financeiro">
            <ButtonOrLink intent={'transparent'} fullWidth href="/financeiro/vendas-pendentes">
              • Vendas Pendentes
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/financeiro/boletos">
              • Boletos
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/financeiro/liberar-pedidos">
              • Librar Pedidos
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/financeiro/contas">
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

export default SideBar;
