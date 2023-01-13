import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Table from '../../components/Table';

const clientCollumns = [
  { heading: 'Cliente', value: 'nome' },
  { heading: 'Produto', value: 'razao_social' },
  { heading: 'Saldo', value: 'cnpj' },
  { heading: 'Opções', value: 'cnpj' }
];

const modelCollumns = [
  { heading: 'Cliente', value: 'nome' },
  { heading: 'Modelo', value: 'razao_social' },
  { heading: 'Saldo', value: 'cnpj' }
];

const Conta: NextPage = () => {
  return (
    <div className="bg-slate-800 h-screen p-3 flex gap-5">
      <SideBar />

      <div className="flex flex-col text-gray-300 w-full">
        <Header title="Lista de Saldos" />
      </div>
    </div>
  );
};

export default Conta;
