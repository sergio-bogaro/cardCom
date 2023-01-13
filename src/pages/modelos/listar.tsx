import { MouseEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import * as ToggleGroup from '@radix-ui/react-toggle-group';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
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

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

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
    <div className="bg-slate-800 h-screen p-3 flex gap-5">
      <SideBar />

      <div className="flex flex-col text-gray-300 w-full">
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
          <button onClick={() => setNewModelModal(true)} className="bg-gray-600 py-2 px-4 rounded-lg">
            Novo Modelo
          </button>

          <form onSubmit={handleSubmit(filterTable)} className="flex gap-6 w-2/5 items-center ml-auto focus-within:w-1/2 transition-all">
            <input
              {...register('searchFilter')}
              placeholder="Pesquisar por nome, email ou n° do documento"
              className="bg-gray-600 outline-none w-full h-8 p-2 rounded-lg"
            />

            <button type="submit" className="bg-gray-600 h-8 px-4 rounded-lg">
              Pesquisar
            </button>
          </form>
        </div>
        <div className="w-full overflow-auto">
          <Table data={modelsData} collumns={collumns} />
        </div>
      </div>

      <Modal isOpen={newModelModal} title={'Cadastrar Novo Modelo'} closeModal={() => setNewModelModal(false)}>
        <form onSubmit={handleSubmit(newModel)} className="flex flex-col gap-2">
          <p>Cliente</p>
          <select {...register('cliente_id')} className="h-8 text-black outline-none">
            {clientData.map((client) => {
              return (
                <option key={client.cnpj} value={client.id}>
                  {client.razao_social}
                </option>
              );
            })}
          </select>

          <p>Nome do Modelo</p>
          <input {...register('nome')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>Status</p>
          <input {...register('status')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>Tipo</p>
          <input {...register('tipo')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>Tipo Chip</p>
          <input {...register('tipo_chip')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>Tem Dados</p>
          <input {...register('tem_dados')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>Tem Fotos</p>
          <input {...register('tem_fotos')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <p>Tem Fotos</p>
          <input {...register('link_projeto')} className="border border-transparent border-b-gray-600 w-full h-8 p-2 text-black outline-none" />

          <button
            type="submit"
            className="mt-4 mx-auto bg-blue-600 hover:bg-blue-800 text-white font-bold w-fit py-2 px-4 rounded-lg transition-property: color">
            Cadastrar Modelo
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ListModels;
