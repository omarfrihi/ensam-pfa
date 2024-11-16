import { isEmpty } from "lodash";
import { downloadcsv } from "../utils";

type TableProps = { data?: object[] };

const Table = ({ data = [] }: TableProps) => {
  if (isEmpty(data)) return <div>Empty Result</div>;
  return (
    <div className="table">
      <div>
        <button
          onClick={(event) => {
            downloadcsv(data);
          }}
        >
          Exporter
        </button>
      </div>
      <table>
        <tr>
          {Object.keys(data?.[0]).map((value) => (
            <th key={value}>{value}</th>
          ))}
        </tr>
        {data?.map((row) => (
          <tr key={JSON.stringify(row)}>
            {Object.values(row).map((column: string) => (
              <td key={column}>{column}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
