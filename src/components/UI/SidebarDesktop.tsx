import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GoThreeBars, GoX } from 'react-icons/go';
import { MdHomeFilled } from 'react-icons/md';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { CollapseButton } from '@ui/CollapseButton';

import logoImage from '../../../public/logo.png';

export const SideBarDesktop = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [collapsableOpen, setCollapsableOpen] = useState("")

  return (
    <>
      <div
        className={`top-0 h-full w-[250px] overflow-auto bg-gray-200 duration-300 ease-in-out
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

          <div className="mb-2 w-full">
            <ButtonOrLink intent={'transparent'} href="/home" fullWidth>
              <MdHomeFilled size={22} />
              Pagina Inicial
            </ButtonOrLink>
          </div>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="temple" title="Administração">
            <ButtonOrLink intent={'transparent'} fullWidth href="/administracao/cadastros">
              • Cadastros
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/administracao/usuarios">
              • Usuários
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/administracao/niveis">
              • Níveis
            </ButtonOrLink>
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="person" title="Clientes e Modelos">
            <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/listar">
              • Listar Clientes
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/cliente/saldo">
              • Saldo dos Clientes
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/modelos/listar">
              • Listar Modelos
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/modelos/saldo">
              • Saldo dos Modelos
            </ButtonOrLink>
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="money" title="Comercial">
            <ButtonOrLink intent={'transparent'} fullWidth href="/comercial/vendas">
              • Vendas
            </ButtonOrLink>
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="cart" title="Pedidos">
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
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="table" title="Expedição">
            <ButtonOrLink intent={'transparent'} fullWidth href="/expedicao/entregas">
              • Entregas
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/expedicao/confirmar-entregas">
              • Confirmar Entregas
            </ButtonOrLink>

            <ButtonOrLink intent={'transparent'} fullWidth href="/expedicao/expedir">
              • Expedir
            </ButtonOrLink>
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="box" title="Estoque e Produtos">
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
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="money" title="Financeiro">
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
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="report" title="Relatórios">
            <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
              • Produção
            </ButtonOrLink>
          </CollapseButton>

          <CollapseButton isOpen={collapsableOpen} setIsOpen={setCollapsableOpen} icon="tool" title="Ferramentas">
            <ButtonOrLink intent={'transparent'} fullWidth href="/home/produtos">
              • WhatsApp
            </ButtonOrLink>
          </CollapseButton>
        </div>
      </div>

      {!isOpen ? (
        <button className="absolute p-4 text-white z-10" onClick={() => setIsOpen(true)}>
          <GoThreeBars size={25} />
        </button>
      ) : (
        ''
      )}
    </>
  );
};