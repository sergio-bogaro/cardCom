import { useEffect, useState } from 'react';
import { GoAlert, GoCheck, GoPackage, GoPencil, GoPlus, GoTrashcan } from 'react-icons/go';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Popover from '@radix-ui/react-popover';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';
import { CreateModelsModal } from '@ui/Modal/Models';

import Header from '../../components/specific/Header';
import SideBar from '../../components/specific/SideBar';
import Table from '../../components/UI/Table';
import { searchClient } from '../../services/clientes';
import { registerModel, searchModels } from '../../services/modelos';
import dialogStyles from '../../styles/alertDialogRadix.module.css';
import popoverStyles from '../../styles/radixPopover.module.css';
import toggleStyles from '../../styles/radixToggleGroup.module.css';

import type { NextPage } from 'next';
const collumns = [
  { heading: 'Cliente', value: 'cliente_id' },
  { heading: 'Modelo', value: 'nome' },
  { heading: 'Status', value: 'status' },
  { heading: 'Tipo', value: 'tipo' },
  { heading: 'Tipo Chip', value: 'tipo_chip' },
  { heading: 'Opções', value: 'opcoes' }
];

const modelsDataMask = [
  {
    cliente_id: '',
    nome: '',
    status: '',
    tipo: '',
    tipo_chip: '',
    opcoes: <> </>
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

  function modelTableOption(model: any) {
    return (
      <Popover.Root>
        <Popover.Trigger>
          <GoPlus />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={popoverStyles.PopoverContent} sideOffset={5} align="end">
            <div className="py-2">
              <ButtonOrLink intent={'transparent'} fullWidth>
                <GoPencil />
                Editar
              </ButtonOrLink>
              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <ButtonOrLink intent={'transparent'} fullWidth>
                    <GoPackage />
                    Duplicar Modelo
                  </ButtonOrLink>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                  <AlertDialog.Overlay className={dialogStyles.AlertDialogOverlay} />
                  <AlertDialog.Content className={dialogStyles.AlertDialogContent}>
                    <p>Tem certeza disso ?</p>
                    <p>Essa ação não pode ser desfeita</p>

                    <div className="mt-5 flex justify-around">
                      <AlertDialog.Cancel asChild>
                        <ButtonOrLink intent={'primary'}>Cancelar</ButtonOrLink>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <ButtonOrLink
                          intent={'secondary'}
                          onClick={() => {
                            delete model['id'];
                            model.nome = model.nome + ' - Copia';
                            registerModel(model);
                          }}>
                          Duplicar
                        </ButtonOrLink>
                      </AlertDialog.Action>
                    </div>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>

              <ButtonOrLink intent={'transparent'} fullWidth>
                <GoCheck />
                Aprovar Modelo
              </ButtonOrLink>
              <ButtonOrLink intent={'transparent'} fullWidth>
                <GoAlert />
                Reprovar Modelo
              </ButtonOrLink>
              <ButtonOrLink intent={'transparent'} fullWidth>
                <GoTrashcan />
                Desativar
              </ButtonOrLink>
            </div>
            <Popover.Arrow className={popoverStyles.PopoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

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
      .then((res) => {
        const table = res.data.data.map((model: any) => ({
          cliente_id: model.cliente.nome,
          nome: model.nome,
          status: model.status,
          tipo: model.tipo,
          tipo_chip: model.tipo_chip,
          opcoes: modelTableOption(model)
        }));

        setModelsData(table);
      })
      .catch((err) => console.log(err));
  }, [newSearch === true]);

  function newValue(value: string) {
    setStatusFilter(value);
    setNewSearch(true);
  }

  return (
    <div>
      <div className="flex gap-2">
        <ToggleGroup.Root className={toggleStyles.ToggleGroup} type="single" defaultValue=" " onValueChange={newValue}>
          <ToggleGroup.Item className={toggleStyles.ToggleGroupItem} value="status=pendente">
            Aprovação
          </ToggleGroup.Item>
          <ToggleGroup.Item className={toggleStyles.ToggleGroupItem} value=" " aria-label="Center aligned">
            Todos os modelos
          </ToggleGroup.Item>
          <ToggleGroup.Item className={toggleStyles.ToggleGroupItem} value="status=reprovado" aria-label="Right aligned">
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
  );
};

export default ListModels;
