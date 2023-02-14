import { FormEvent, useEffect, useState } from 'react';
import Select from 'react-select';

import { searchClient } from '@services/clientes';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { Loading } from '@ui/Loading';
import { SelctStyles } from '@ui/Select';
import { Table } from '@ui/Table';

import { clientDataType } from '../../types/client';

import type { NextPage } from 'next';
const CriarPedido: NextPage = () => {
  const [clientData, setClientData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filter = '';
    const page = '0';
    searchClient(filter, page)
      .then((res) => {
        const clientsList = res.data.data;
        console.log(clientsList);
        const clientListSelect = clientsList.map((client: clientDataType) => ({
          value: client.id,
          label: client.nome
        }));

        setClientData(clientListSelect);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mx-auto flex w-11/12 flex-col gap-4 rounded p-5">
      <div className="flex justify-around">
        <div>
          <p>Para fazer novo pedido, selecione o cliente</p>
          <Select styles={SelctStyles} className="text-gray-300" options={clientData} placeholder=" ..." />
        </div>
      </div>

      <Loading isLoading={isLoading} />
    </div>
  );
};

export default CriarPedido;
