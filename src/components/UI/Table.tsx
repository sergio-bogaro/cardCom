import { ReactNode } from 'react';

interface collumnProps {
  heading: string;
  value: string;
}

interface tableProps {
  collumns: collumnProps[];
  data: Array<{
    [x: string]: ReactNode;
  }>;
}

const Table = ({ data, collumns }: tableProps) => {
  return (
    <table className="mt-10  w-full text-left">
      <thead>
        <tr>
          {collumns.map((item, index) => (
            <th className="p-3 text-xl font-bold" key={item.heading + index}>
              {item.heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="border border-solid border-slate-700 bg-slate-900">
        {data.map((item: any, index: any) => (
          <tr key={'TableLine' + index} className="border border-b border-slate-700">
            {collumns.map((collumnItem, index) => (
              <td
                className="min-w-[200px] border-solid border-slate-700 p-3 last:min-w-fit last:border last:text-center"
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

export default Table;
