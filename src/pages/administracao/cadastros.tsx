import { GoPencil, GoPlus, GoTrashcan } from 'react-icons/go';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Table } from '@ui/Table';

import styles from '../../styles/alertDialogRadix.module.css';

import type { NextPage } from 'next';

const paymentMethodsColumn = [
  { heading: 'Nome', value: 'nome' },
  { heading: 'Parcelado', value: 'parcelado' },
  { heading: 'Opções', value: 'opcoes' }
];

const shippingMethodsColumn = [
  { heading: 'Nome', value: 'nome' },
  { heading: 'Descrição', value: 'descricao' },
  { heading: 'Opções', value: 'opcoes' }
];

const functionalitiesColumn = [
  { heading: 'Icone', value: 'icone' },
  { heading: 'Nome', value: 'nome' },
  { heading: 'Descrição', value: 'descricao' },
  { heading: 'Modulo', value: 'modulo' },
  { heading: 'Rota Principal', value: 'rota_principal' },
  { heading: 'Opções', value: 'opcoes' }
];
const Cadastros: NextPage = () => {
  function generateOption() {
    return (
      <div className="mx-auto flex w-fit gap-1">
        <ButtonOrLink>
          <GoPencil />
        </ButtonOrLink>

        <ButtonOrLink intent={'danger'}>
          <GoTrashcan />
        </ButtonOrLink>
      </div>
    );
  }

  const paymentMethodsData = [
    {
      nome: 'Cartão Debito',
      parcelado: ' - ',
      opcoes: generateOption()
    }
  ];

  const shippingMethodsData = [
    {
      nome: 'Cartão Debito',
      descricao:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      opcoes: generateOption()
    }
  ];

  const functionalitiesData = [
    {
      icone: ' - ',
      nome: 'Usuários',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      modulo: ' - ',
      rota_principal: ' - ',
      opcoes: generateOption()
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-10 2xl:grid-cols-2">
      <div className="mx-auto flex w-full flex-col rounded bg-slate-850 p-3 lg:mx-0 lg:min-w-[500px]">
        <div className="flex w-full items-center justify-around">
          <span className="text-xl font-bold">Formas de pagamento</span>
          <ButtonOrLink intent={'secondary'}>
            <GoPlus />
            Nova Forma de Pagamento
          </ButtonOrLink>
        </div>

        <div className="overflow-auto">
          <Table collumns={paymentMethodsColumn} data={paymentMethodsData} />
        </div>
      </div>

      <div className="mx-auto flex w-full flex-col rounded bg-slate-850 p-3 lg:mx-0 lg:min-w-[500px]">
        <div className="flex w-full items-center justify-around">
          <span className="text-xl font-bold">Formas de Entrega</span>
          <ButtonOrLink intent={'secondary'}>
            <GoPlus />
            Nova Forma de Entrega
          </ButtonOrLink>
        </div>

        <div className="overflow-auto">
          <Table collumns={shippingMethodsColumn} data={shippingMethodsData} />
        </div>
      </div>

      <div className="mx-auto flex w-full flex-col rounded bg-slate-850 p-3 lg:mx-0 lg:min-w-[500px]">
        <div className="flex w-full items-center justify-around">
          <span className="text-xl font-bold">Funcionalidades</span>
          <ButtonOrLink intent={'secondary'}>
            <GoPlus />
            Nova Funcionalidade
          </ButtonOrLink>
        </div>

        <div className="overflow-auto">
          <Table collumns={functionalitiesColumn} data={functionalitiesData} />
        </div>
      </div>
    </div>
  );
};

export default Cadastros;
