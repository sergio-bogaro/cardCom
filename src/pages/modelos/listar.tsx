import { MouseEvent, useEffect, useState } from 'react';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { CreateModelsModal } from '@ui/Modal/Models';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Table from '../../components/Table';
import { searchClient } from '../../services/clientes';
import { registerModel, searchModels } from '../../services/modelos';
import styles from '../../styles/radixToggleGroup.module.css';

import type { NextPage } from 'next';
const collumns = [
  { heading: 'Cliente', value: 'cliente_id' },
  { heading: 'Modelo', value: 'nome' },
  { heading: 'Status', value: 'status' },
  { heading: 'Tipo', value: 'tipo' },
  { heading: 'Tipo Chip', value: 'tipo_chip' }
];

const modelsDataMask = [
  {
    cliente_id: '',
    nome: '',
    status: '',
    tipo: '',
    tipo_chip: ''
  }
];

const clientDataMask = [
  {
    nome: '',
    razao_social: '',
    id: '',
    cnpj: ''
  }
];

const ListModels: NextPage = () => {
  const [modelsData, setModelsData] = useState(modelsDataMask);
  const [clientData, setClientData] = useState(clientDataMask);
  const [newSearch, setNewSearch] = useState(false);
  const [newModelModal, setNewModelModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const filterTable = (data: any) => {
    const search = data.searchFilter ? 'search=' + data.searchFilter : '';
    searchModels(search);
    setSearchFilter(search);
    setNewSearch(true);
  };

  const newModel = (data: any) => {
    registerModel(data)
      .then((res) => setNewSearch(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setNewSearch(false);
    const modelFilter = statusFilter && searchFilter ? statusFilter + '&' + searchFilter : statusFilter + searchFilter;
    searchModels(modelFilter)
      .then((res) => setModelsData(res.data.data))
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  useEffect(() => {
    setNewSearch(false);
    searchClient(searchFilter)
      .then((res) => setClientData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  function newValue(value: string) {
    setStatusFilter(value);
    setNewSearch(true);
  }

  return (
    <div className="flex h-screen gap-5 bg-slate-800 p-3">
      <SideBar />

      <div className="flex w-full flex-col text-gray-300">
        <Header title="Lista de Modelos" />
        <div className="flex gap-2">
          <ToggleGroup.Root className={styles.ToggleGroup} type="single" defaultValue=" " onValueChange={newValue}>
            <ToggleGroup.Item className={styles.ToggleGroupItem} value="status=pendente">
              Aprovação
            </ToggleGroup.Item>
            <ToggleGroup.Item className={styles.ToggleGroupItem} value=" " aria-label="Center aligned">
              Todos os modelos
            </ToggleGroup.Item>
            <ToggleGroup.Item className={styles.ToggleGroupItem} value="status=reprovado" aria-label="Right aligned">
              Reprovados
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <div>
            <CreateModelsModal listPage text="Novo Modelo" />
          </div>

          <form className="ml-auto flex w-1/2  transition-all">
            <Input label="" placeholder="Pesquisar Cliente" />
            <ButtonOrLink intent={'primary'}>Pesquisar</ButtonOrLink>
          </form>
        </div>
        <div className="w-full overflow-auto">
          <Table data={modelsData} collumns={collumns} />
        </div>
      </div>
    </div>
  );
};

export default ListModels;
