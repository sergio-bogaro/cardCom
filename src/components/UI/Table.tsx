import { ReactNode, useEffect, useState } from 'react';
import { GoArrowUp } from 'react-icons/go';

interface collumnProps {
  heading: string;
  value: string;
  width?: number;
  sortable?: boolean;
}

interface tableProps {
  collumns: collumnProps[];
  data: Array<{
    [x: string]: ReactNode;
  }>;
}

type Order = 'asc' | 'desc';

export const Table = ({ data, collumns }: tableProps) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('');

  function handleSorteOrder(row: string) {
    const isAsc = order === 'asc';
    const newOrderRow = orderBy != row;

    setOrderBy(row);
    setOrder(newOrderRow ? 'asc' : isAsc ? 'desc' : 'asc');
  }

  useEffect(() => {
    const orderFilter = `${order === "asc" ? "" : "-"}${orderBy} `
    console.log(orderFilter)
  }, [order, orderBy]);

  return (
    <table className="mt-10  w-full text-left overflow-auto min-w-[500px]">
      <thead>
        <tr>
          {collumns.map((item, index) => (
            <th className={`p-3 text-xl font-bold ${item.sortable ? "hover:cursor-pointer" : ''}`} onClick={() => item.sortable ? handleSorteOrder(item.value) : null} key={item.heading + index}>
              <div className='flex gap-3 items-center'>
                {item.heading}
                <GoArrowUp className={`transition-all ${orderBy === item.value ? "block" : "hidden"} ${order === "asc" ? "rotate-0" : "rotate-180"}`} />
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="border border-solid border-gray-700 bg-gray-500 dark:border-slate-700 dark:bg-slate-850">
        {data.map((item: any, index: any) => (
          <tr key={'TableLine' + index} className="border border-b border-slate-700">
            {collumns.map((collumnItem, index) => (
              <td
                className={`border-solid border-slate-700 p-3 last:border last:text-center
                ${collumnItem.width ? `min-w-[${collumnItem.width}px]` : ''}`}
                key={item[collumnItem.value] + index}>
                {item[collumnItem.value]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
