interface collumnProps {
  heading: string;
  value: string;
}

interface tableProps {
  data: any;
  collumns: collumnProps[];
}

const Table = ({ data, collumns }: tableProps) => {
  return (
    <table className="w-full min-w-[1000px] text-center">
      <thead>
        <tr className="border-2 border-solid border-transparent border-b-slate-900">
          {collumns.map((item, index) => (
            <th className="p-3" key={item.heading + index}>
              {item.heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item: any, index: any) => (
          <tr key={'TableLine' + index} className="m-6 border-2 border-solid border-transparent border-b-slate-900">
            {collumns.map((collumnItem, index) => (
              <td className="p-3" key={item[collumnItem.value] + index}>
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
