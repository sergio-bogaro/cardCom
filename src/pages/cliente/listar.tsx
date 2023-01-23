import { useEffect, useState } from 'react';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { CreateClientModal } from '@ui/Modal/Client';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Table from '../../components/Table';
import { registerClient, searchClient } from '../../services/clientes';

import type { NextPage } from 'next';
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
    <div className="flex h-screen bg-slate-800 p-2">
      <SideBar />

      <div className="flex w-full flex-col p-2 text-gray-300">
        <Header title="Lista de Clientes" />
        <div className="flex gap-4">
          <div>
            <CreateClientModal text="Novo Cliente" />
          </div>
          <ButtonOrLink intent={'transparent'}>Importar Planilha</ButtonOrLink>

          <form className="ml-auto flex w-1/2  transition-all">
            <Input label="" placeholder="Pesquisar Cliente" />
            <ButtonOrLink intent={'primary'}>Pesquisar</ButtonOrLink>
          </form>
        </div>
        <div className="w-full overflow-auto">
          <Table data={clientData} collumns={collumns} />
        </div>
      </div>
    </div>
  );
};

export default ListClients;
