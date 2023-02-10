import { GoPlus } from 'react-icons/go';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import Table from '@ui/Table';

import type { NextPage } from 'next';
const Home: NextPage = () => {
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-4 rounded bg-slate-850 p-5">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Lista de Usuários</h2>
        <ButtonOrLink intent={'secondary'}>
          <GoPlus /> Novo Usuário
        </ButtonOrLink>
      </div>

      <div className="flex gap-2">
        <Input label={''} />
        <ButtonOrLink intent={'secondary'}>
          <HiMagnifyingGlass />
        </ButtonOrLink>
      </div>

      <Table collumns={[]} data={[]} />
    </div>
  );
};

export default Home;
