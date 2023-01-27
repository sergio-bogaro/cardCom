import { useEffect, useState } from 'react';
import { GoHome, GoPencil, GoPerson, GoPlus } from 'react-icons/go';

import * as Popover from '@radix-ui/react-popover';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { CreateClientModal } from '@ui/Modal/Client';

import Header from '../../components/specific/Header';
import SideBar from '../../components/specific/SideBar';
import Table from '../../components/UI/Table';
import { searchClient } from '../../services/clientes';
import styles from '../../styles/radixPopover.module.css';
import { clientDataType } from '../../types/client';

import type { NextPage } from 'next';
const collumns = [
  { heading: 'Nome', value: 'nome' },
  { heading: 'Razão Social', value: 'razao_social' },
  { heading: 'CNPJ', value: 'cnpj' },
  { heading: 'Opções', value: 'opcoes' }
];

const clientDataMask = [
  {
    nome: '',
    razao_social: '',
    cnpj: '',
    opcoes: <></>
  }
];

const ListClients: NextPage = () => {
  const [clientData, setClientData] = useState(clientDataMask);
  const [newSearch, setNewSearch] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const filterTable = (data: any) => {
    setSearchFilter(data.searchFilter);
    setNewSearch(true);
  };

  useEffect(() => {
    setNewSearch(false);
    searchClient(searchFilter)
      .then((res) => {
        const table = res.data.data.map((client: clientDataType) => ({
          nome: client.nome,
          razao_social: client.razao_social,
          cnpj: client.cnpj,
          opcoes: (
            <Popover.Root>
              <Popover.Trigger>
                <GoPlus />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className={styles.PopoverContent} sideOffset={5} align="end">
                  <div className="py-2">
                    <ButtonOrLink intent={'transparent'} fullWidth>
                      <GoPencil />
                      Editar
                    </ButtonOrLink>
                    <ButtonOrLink intent={'transparent'} fullWidth>
                      <GoHome />
                      Filiais
                    </ButtonOrLink>
                    <ButtonOrLink intent={'transparent'} fullWidth>
                      <GoPlus />
                      Mais Informações
                    </ButtonOrLink>
                    <ButtonOrLink intent={'transparent'} fullWidth>
                      <GoPerson />
                      Usuários
                    </ButtonOrLink>
                  </div>
                  <Popover.Arrow className={styles.PopoverArrow} />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )
        }));

        setClientData(table);
      })
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  return (
    <div className="flex h-screen bg-slate-800 p-2">
      <SideBar />

      <div className="flex w-full flex-col p-2 text-gray-300">
        <Header title="Lista de Clientes" />
        <div className="flex gap-4">
          <div>
            <CreateClientModal text="Novo Cliente" listPage />
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
