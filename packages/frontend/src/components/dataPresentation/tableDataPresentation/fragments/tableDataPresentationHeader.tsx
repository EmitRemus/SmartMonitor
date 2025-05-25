interface TableDataPresentationHeaderProps {
  names: string[];
}

export const TableDataPresentationHeader = ({
  names,
}: TableDataPresentationHeaderProps) => {
  return (
    <tr>
      {names.map((name, index) => {
        return <th key={`header-${index}`}>{name}</th>;
      })}
    </tr>
  );
};
