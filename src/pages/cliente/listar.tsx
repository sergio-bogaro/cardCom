import { useFormik } from 'formik';
import Papa from 'papaparse';
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { GoFile, GoHome, GoPencil, GoPerson, GoPlus } from 'react-icons/go';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import * as Popover from '@radix-ui/react-popover';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { Loading } from '@ui/Loading';
import { Modal } from '@ui/Modal/Modal';
import Pagination from '@ui/Pagination';

import Header from '../../components/specific/Header';
import SideBar from '../../components/specific/SideBar';
import Table from '../../components/UI/Table';
import { registerClient, searchClient } from '../../services/clientes';
import styles from '../../styles/radixPopover.module.css';
import { clientDataType } from '../../types/client';

import type { NextPage } from 'next';
const collumns = [
  { heading: 'Nome', value: 'nome' },
  { heading: 'Razão Social', value: 'razao_social' },
  { heading: 'CNPJ', value: 'cnpj' },
  { heading: '', value: 'opcoes' }
];

const clientTableDataMask = [
  {
    nome: '',
    razao_social: '',
    cnpj: '',
    opcoes: <></>
  }
];

const clientFormValues = {
  id: '',
  nome: '',
  cnpj: '',
  razao_social: ''
};

const ListClients: NextPage = () => {
  const [clientData, setClientData] = useState(clientTableDataMask);
  const [clientFormValue, setClientFormValue] = useState(clientFormValues);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [newSearch, setNewSearch] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const createClientForm = useFormik({
    enableReinitialize: true,
    initialValues: clientFormValue,
    onSubmit: (data) => {
      console.log(data);
      registerClient(data)
        .then((res) => {
          const data = res.data.data;
          const tableWithNewClient = {
            nome: data.nome,
            razao_social: data.razao_social,
            cnpj: data.cnpj,
            opcoes: clientTableOption(data.id)
          };

          setClientData([tableWithNewClient, ...clientData]);
          createClientForm.resetForm();
          setIsOpen(false);
        })
        .catch((err) => console.log(err));
    }
  });

  const filterTable = (e: FormEvent) => {
    e.preventDefault();
    setNewSearch(true);
  };

  function handlePageChange(newCurrentPage: number) {
    setCurrentPage(newCurrentPage);
    setNewSearch(true);
  }

  function clientByExcel(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        results.data.map(async (client) => {
          await registerClient(client);
        });
      }
    });
  }

  function clientTableOption(client?: any) {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <GoPlus />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={styles.PopoverContent} sideOffset={5} align="end">
            <div className="py-2">
              <Popover.Close asChild>
                <ButtonOrLink
                  intent={'transparent'}
                  onClick={() => {
                    const activeClientData = {
                      id: client.id,
                      nome: client.nome,
                      cnpj: client.cnpj,
                      razao_social: client.razao_social
                    };
                    setClientFormValue(activeClientData);
                    setIsOpen(true);
                  }}
                  fullWidth>
                  <GoPencil />
                  Editar
                </ButtonOrLink>
              </Popover.Close>

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
    );
  }

  useEffect(() => {
    setNewSearch(false);
    setLoadingData(true);
    const page = (currentPage - 1).toString();
    searchClient(searchFilter, page)
      .then((res) => {
        setTotalPages(res.data.pages);
        const table = res.data.data.map((client: clientDataType) => ({
          nome: client.nome,
          razao_social: client.razao_social,
          cnpj: client.cnpj,
          opcoes: clientTableOption(client)
        }));

        setClientData(table);
        setLoadingData(false);
      })
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  return (
    <div>
      <div className="flex gap-4">
        <ButtonOrLink intent={'secondary'} onClick={() => setIsOpen(true)}>
          <GoPlus />
          Cadastrar
        </ButtonOrLink>

        <label
          className="flex cursor-pointer items-center gap-2 rounded bg-green-700 px-4 py-2 hover:bg-green-800"
          htmlFor="importButton">
          <GoFile />
          Importar
          <input id="importButton" className="hidden" type={'file'} accept=".csv" onChange={clientByExcel} />
        </label>

        <form className="ml-auto flex w-1/2 gap-2" onSubmit={filterTable}>
          <Input
            label=""
            placeholder="Pesquisar Cliente"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <ButtonOrLink intent={'secondary'} type={'submit'}>
            <HiOutlineMagnifyingGlass />
          </ButtonOrLink>
        </form>
      </div>
      <div className="overflow-auto">
        <Table data={clientData} collumns={collumns} />
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
      <Loading isLoading={loadingData} />

      <Modal title="Cadastar Cliente" isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <form onSubmit={createClientForm.handleSubmit} className="flex flex-col gap-2">
          <Input
            label="Nome"
            name="nome"
            value={createClientForm.values.nome}
            onChange={createClientForm.handleChange}
            required
          />

          <Input
            label="CNPJ"
            name="cnpj"
            value={createClientForm.values.cnpj}
            onChange={createClientForm.handleChange}
            required
          />

          <Input
            label="Razão Social"
            name="razao_social"
            value={createClientForm.values.razao_social}
            onChange={createClientForm.handleChange}
            required
          />

          <div className="m-auto">
            <ButtonOrLink intent={'secondary'} type="submit">
              Salvar Cliente
            </ButtonOrLink>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ListClients;
