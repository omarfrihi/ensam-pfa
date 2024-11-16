import { FadeLoader } from "react-spinners";
import { useQueryHistory } from "../hooks/useQueryHistory";
import Table from "../components/Table";
import { useState } from "react";
import Modal from "../components/modal";

const History = () => {
  const { isFetching, isError, data } = useQueryHistory();
  const [query, setQuery] = useState<object[]>();
  if (isFetching) return <FadeLoader color="#ed8615" />;
  if (isError) return <span>Error..</span>;

  return (
    <div className="table">
      <table>
        <tr>
          <th>Date de requette</th>
          <th>Afficher</th>
        </tr>
        {data?.data?.map((row) => (
          <tr key={row.createdAt}>
            <td>{row.createdAt}</td>
            <td
              style={{ cursor: "pointer" }}
              onClick={() => setQuery(row.queryResult)}
            >
              Afficher
            </td>
          </tr>
        ))}
      </table>
      <Modal isOpen={!!query} onClose={() => setQuery(undefined)}>
        <Table data={query} />
      </Modal>
    </div>
  );
};

export default History;
