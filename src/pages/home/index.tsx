import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

import { Card } from '@ui/Card';

import Header from '../../components/specific/Header';
import SideBar from '../../components/specific/SideBar';
import { UserContext } from '../../contexts/auth';

const Home: NextPage = () => {
  const user = useContext(UserContext);

  return (
    <div className="flex h-screen gap-5 bg-slate-800 p-3">
      <SideBar />

      <div className="flex w-full flex-col">
        <div className="w-full rounded-lg bg-slate-900 p-3 text-gray-300">
          <Header title="Pagina Inicial" />
          <div className="flex flex-row">
            <div className="w-3/4">
              <p>Ola {user.nome}</p>
              <p>Seu ID: {user.id}</p>
              <h2 className="mt-6">Visão Geral</h2>
              <span>Ultimo Mes</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10 p-5 ">
            <Card cardTitle="OC Pendentes" quantity="10" />
            <Card cardTitle="Requisições Pendentes" quantity="3" />
            <Card cardTitle="Estoque" quantity="6" />
            <Card cardTitle="Alerta de Contas" quantity="2" />
            <Card cardTitle="Pedidos de Orçamento" quantity="13" />
            <Card cardTitle="Fazer pedido" quantity="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
