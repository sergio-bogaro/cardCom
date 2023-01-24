import type { NextPage } from 'next';
import Header from '../../components/specific/Header';
import SideBar from '../../components/specific/SideBar';

const Conta: NextPage = () => {
  return (
    <div className="flex h-screen gap-5 bg-slate-800 p-3">
      <SideBar />

      <div className="flex w-full flex-col text-gray-300">
        <Header title="Lista de Saldos" />
      </div>
    </div>
  );
};

export default Conta;
