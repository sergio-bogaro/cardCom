import { useFormik } from 'formik';
import Papa from 'papaparse';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { GoFile, GoHome, GoPencil, GoPerson, GoPlus } from 'react-icons/go';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import * as Popover from '@radix-ui/react-popover';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { Loading } from '@ui/Loading';
import { Modal } from '@ui/Modal/Modal';
import Pagination from '@ui/Pagination';

import { Table } from '../../components/UI/Table';
import { UserContext } from '../../contexts/auth';
import { clientSchema } from '../../schemas/client';
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

  const { transactionClient } = useContext(UserContext);

  const searchClient = (filter: string, page: string) => {
    const searchProps = `search=${filter}&page=${page}`;
    return transactionClient.get('/v1/cliente/search?' + searchProps);
  };

  const registerClient = (data: any) => {
    return transactionClient.post('v1/cliente/save', data);
  };

  const { values, errors, touched, handleSubmit, handleChange, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: clientFormValue,
    validationSchema: clientSchema,
    onSubmit: (data) => {
      registerClient(data)
        .then((res: any) => {
          const responseData = res.data.data;
          const clientNew = {
            nome: responseData.nome,
            razao_social: responseData.razao_social,
            cnpj: responseData.cnpj,
            opcoes: clientTableOption(responseData.id)
          };
          const newTable = [clientNew, ...clientData.filter((client) => client.cnpj != data.cnpj)];

          setClientData(newTable);
          resetForm();
          setIsOpen(false);
        })
        .catch((err: any) => console.log(err));
    }
  });

  const filterTable = (event: FormEvent) => {
    event.preventDefault();
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
      .then((res: any) => {
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
      .catch((err: any) => console.log(err));
  }, [newSearch === true]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="ml-auto flex gap-4 lg:ml-0">
          <ButtonOrLink
            intent={'secondary'}
            onClick={() => {
              setIsOpen(true);
              setClientFormValue(clientFormValues);
            }}>
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
        </div>
        <form className="ml-auto flex w-full gap-2 lg:w-1/2" onSubmit={filterTable}>
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            validator={errors.nome && touched.nome ? true : false}
            label="Nome"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />

          <Input
            validator={errors.cnpj && touched.cnpj ? true : false}
            label="CNPJ"
            name="cnpj"
            value={values.cnpj}
            onChange={handleChange}
          />

          <Input
            validator={errors.razao_social && touched.razao_social ? true : false}
            label="Razão Social"
            name="razao_social"
            value={values.razao_social}
            onChange={handleChange}
          />

          <div className="m-auto">
            <ButtonOrLink intent={'secondary'} type={'submit'}>
              Salvar Cliente
            </ButtonOrLink>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ListClients;
