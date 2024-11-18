import { isEmpty } from "lodash";
import { downloadcsv } from "../utils";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TableProps = { data?: object[] };

const Table = ({ data = [] }: TableProps) => {
  const [page, setPage] = useState(0);
  const rows = data.slice(page * 25, (page + 1) * 25);
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
        {rows?.map((row) => (
          <tr key={uuidv4()}>
            {Object.values(row).map((column: string) => (
              <td key={column}>{column}</td>
            ))}
          </tr>
        ))}
      </table>
      <div className="pagination">
        <a href="#">&laquo;</a>
        {Array.from(Array(Math.ceil(data.length / 25)).keys()).map((elem) => (
          <a
            key={elem}
            onClick={() => setPage(elem)}
            className={page === elem ? "active" : ""}
          >
            {elem + 1}
          </a>
        ))}

        <a href="#">&raquo;</a>
      </div>
    </div>
  );
};

export default Table;
