import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SideBar from '../../components/SideBar';
import Table from '../../components/Table';
import { registerClient, searchClient } from '../../services/clientes';

const collumns = [
  { heading: 'Nome', value: 'nome' },
  { heading: 'Razão Social', value: 'razao_social' },
  { heading: 'CNPJ', value: 'cnpj' }
];

const clientDataMask = [
  {
    nome: '',
    razao_social: '',
    cnpj: ''
  }
];

const ListClients: NextPage = () => {
  const [clientData, setClientData] = useState(clientDataMask);
  const [newClientModal, setNewClientModal] = useState(false);
  const [newSearch, setNewSearch] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitNewClient = (data: any) =>
    registerClient(data)
      .then((res) => {
        setNewSearch(true);
        setNewClientModal(false);
        reset();
      })
      .catch((err) => console.log(err));

  const filterTable = (data: any) => {
    setSearchFilter(data.searchFilter);
    setNewSearch(true);
  };

  useEffect(() => {
    setNewSearch(false);
    searchClient(searchFilter)
      .then((res) => setClientData(res.data.data))
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  return (
    <div className="bg-slate-800 h-screen p-3 flex gap-5">
      <SideBar />

      <div className="flex flex-col text-gray-300 w-full">
        <Header title="Lista de Clientes" />
        <div className="flex gap-4">
          <button onClick={() => setNewClientModal(true)} className="bg-gray-600 h-8 w-32 rounded-lg">
            Novo Cliente
          </button>
          <button className="bg-gray-600 h-8 w-40 rounded-lg">Importar Planilha</button>

          <form onSubmit={handleSubmit(filterTable)} className="flex gap-6 w-1/2 items-center ml-auto">
            <input
              {...register('searchFilter')}
              placeholder="Pesquisar por nome, email ou n° do documento"
              className="bg-gray-600 outline-none w-full h-8 p-2 rounded-lg"
            />

            <button type="submit" className="bg-gray-600 h-8 w-32 rounded-lg">
              Pesquisar
            </button>
          </form>
        </div>
        <div className="w-full overflow-auto">
          <Table data={clientData} collumns={collumns} />
        </div>
      </div>

      <Modal title="Cadastar Novo Cliente" isOpen={newClientModal} closeModal={() => setNewClientModal(false)}>
        <form onSubmit={handleSubmit(submitNewClient)} className="flex flex-col gap-2">
          <p>Nome</p>
          <input {...register('nome')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>CNPJ</p>
          <input {...register('cnpj')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>Razão Social</p>
          <input {...register('razao_social')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <button
            type="submit"
            className="mt-4 mx-auto bg-blue-600 hover:bg-blue-800 text-white font-bold w-fit py-2 px-4 rounded-lg transition-property: color">
            Cadastrar Usuário
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ListClients;
