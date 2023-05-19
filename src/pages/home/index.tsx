import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

import { Card } from '@ui/Card';

import { UserContext } from '../../contexts/auth';

const Home: NextPage = () => {
  const { userData, setCurrentPageName } = useContext(UserContext);

  useEffect(() => {
    setCurrentPageName("Pagina Inicial")
  })

  return (
    <div className="rounded-lg bg-gray-500 dark:bg-slate-850 p-6">
      <div className="flex flex-row">
        <div className="w-3/4">
          <p>Ola {userData?.nome}</p>
          <p>Seu ID: {userData?.id}</p>
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
  );
};

export default Home;
