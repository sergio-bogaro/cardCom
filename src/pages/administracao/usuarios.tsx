import { FormEvent, useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

import { searchUsers } from '@services/users';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { Loading } from '@ui/Loading';
import { Table } from '@ui/Table';

import type { NextPage } from 'next';
const tableColumns = [
  { heading: 'Nome', value: 'nome' },
  { heading: 'Nivel', value: 'nivel' },
  { heading: 'Login', value: 'email' },
  { heading: '', value: 'opcoes' }
];
const Home: NextPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [newSearch, setNewSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function userTableOption(user: any) {
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

  useEffect(() => {
    const page = '0';
    setNewSearch(false);
    setIsLoading(true);
    searchUsers(searchFilter, page)
      .then((res) => {
        const table = res.data.data.map((user: any) => ({
          nome: user.nome,
          nivel: user.papel.nome,
          email: user.email,
          opcoes: userTableOption(user)
        }));

        setUserData(table);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [newSearch]);

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-4 rounded p-5">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Lista de Usuários</h2>
        <ButtonOrLink intent={'secondary'}>
          <GoPlus /> Novo Usuário
        </ButtonOrLink>
      </div>

      <form className="flex gap-2" onSubmit={filterTable}>
        <Input label="" placeholder="Pesquisar Usuário" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
        <ButtonOrLink intent={'secondary'} type={'submit'}>
          <HiOutlineMagnifyingGlass />
        </ButtonOrLink>
      </form>

      <Table collumns={tableColumns} data={userData} />
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default Home;
