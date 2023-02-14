import { FormEvent, useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { Loading } from '@ui/Loading';
import { Table } from '@ui/Table';

import type { NextPage } from 'next';
const tableColumns = [{ heading: 'Nome', value: 'nome' }];

const Fornecedores: NextPage = () => {
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [newSearch, setNewSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function tableOption(user: any) {
    return (
      <div>
        <h2>{user.nome}</h2>
      </div>
    );
  }

  const filterTable = (e: FormEvent) => {
    e.preventDefault();
    setNewSearch(true);
  };

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-4 rounded p-5">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="ml-auto flex gap-4 lg:ml-0">
          <ButtonOrLink intent={'secondary'}>
            <GoPlus />
            Cadastrar
          </ButtonOrLink>
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

      <Table collumns={tableColumns} data={data} />
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default Fornecedores;
