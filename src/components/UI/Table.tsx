import { ReactNode } from 'react';

interface collumnProps {
  heading: string;
  value: string;
  width?: number;
}

interface tableProps {
  collumns: collumnProps[];
  data: Array<{
    [x: string]: ReactNode;
  }>;
}

export const Table = ({ data, collumns }: tableProps) => {
  return (
    <table className="mt-10  w-full text-left overflow-auto min-w-[500px]">
      <thead>
        <tr>
          {collumns.map((item, index) => (
            <th className="p-3 text-xl font-bold" key={item.heading + index}>
              {item.heading}
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
