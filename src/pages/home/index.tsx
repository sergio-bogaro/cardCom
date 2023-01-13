import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { UserContext } from '../../contexts/auth';

const Home: NextPage = () => {
  const user = useContext(UserContext);

  return (
    <div className="bg-slate-800 h-screen p-3 flex gap-5">
      <SideBar />

      <div className="flex flex-col w-full">
        <div className="bg-slate-900 w-full rounded-lg text-gray-300 p-3">
          <Header title="Pagina Inicial" />
          <div className="flex flex-row">
            <div className="w-3/4">
              <p>Ola {user.nome}</p>
              <p>Seu ID: {user.id}</p>
              <h2 className="mt-6">Visão Geral</h2>
              <span>Ultimo Mes</span>
            </div>
          </div>

          <div>
            <div className="flex justify-around flex-wrap mt-10">
              <Card cardTitle="OC Pendentes" quantity="10" />
              <Card cardTitle="Requisições Pendentes" quantity="3" />
              <Card cardTitle="Estoque" quantity="6" />
            </div>

            <div className="flex justify-around flex-wrap mt-10">
              <Card cardTitle="Alerta de Contas" quantity="2" />
              <Card cardTitle="Pedidos de Orçamento" quantity="13" />
              <Card cardTitle="Fazer pedido" quantity="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
