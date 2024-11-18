import { flatten, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import type { RuleGroupType } from "react-querybuilder";
import QueryBuilder, {
  defaultOperators,
  formatQuery,
} from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { FadeLoader } from "react-spinners";
import { Etype, getFields } from "../fields";
import { Entity, useMetadata } from "../hooks/useMetaData";
import { useQueryResult } from "../hooks/useQueryResult";
import escape from "js-string-escape";
import { downloadcsv, transformBooleans } from "../components/utils";
import Table from "../components/Table";
const initialQuery: RuleGroupType = { combinator: "and", rules: [] };
type Column = {
  alias?: string;
  name: string;
  type?: Etype;
  possibleValues?: string[];
};
const Dashboard = () => {
  const [table, setTable] = useState("");
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    setColumns([]);
    setQuery(initialQuery);
  }, [table]);
  const [query, setQuery] = useState(initialQuery);
  const { isFetching: isMetadataLoading, data, isError } = useMetadata();

  const getColumns = (columns?: Entity[]): Column[] =>
    flatten(
      columns?.map(({ columns, ...rest }) =>
        columns
          ? getColumns(columns)
          : {
              alias: rest.alias,
              name: rest.name as string,
              type: rest.type,
              possibleValues: rest.enum,
            }
      )
    );
  const columnsList = flatten(
    getColumns(
      data?.data?.find(({ tableName }) => tableName === table)?.columns
    )
  );
  const selectedTable = data?.data?.find(
    ({ tableName }) => tableName === table
  );

  const gatTables = (entity: Entity): string[] =>
    flatten([
      entity.tableName,
      ...(entity.columns || [])
        ?.map((entity) => gatTables(entity))
        .filter((u) => u),
    ]);

  const tables = !selectedTable ? [] : gatTables(selectedTable);

  const fields = columnsList.map(({ name, alias, possibleValues, type }) => ({
    name,
    label: alias,
    ...getFields(type as Etype, possibleValues),
  }));

  const preparedQuery = {
    select: columns,
    ...formatQuery(query, {
      format: "parameterized_named",
      preset: "mysql",
      parseNumbers: true,
    }),
  };
  console.log(transformBooleans(preparedQuery.params));
  const {
    refetch,
    isFetching,
    isError: isResultError,
    data: resultQueryData,
  } = useQueryResult(
    transformBooleans(preparedQuery.params),
    preparedQuery.select,
    preparedQuery.sql,
    tables
  );

  if (isMetadataLoading) return <FadeLoader color="#ed8615" />;
  if (isError) return <span>Error..</span>;
  return (
    <div className="dashboard">
      <label htmlFor="tables"> </label>
      <fieldset>
        <legend>Choisir un tableau</legend>
        <select
          name="tables"
          id="tables"
          onChange={(event) => setTable(event.target.value)}
        >
          <option disabled selected value="">
            -- select an option --
          </option>

          {data?.data?.map(({ tableName, label }) => (
            <option value={tableName} key={tableName}>
              {label}
            </option>
          ))}
        </select>
      </fieldset>

      {table && (
        <fieldset>
          <legend>Selection</legend>
          <select
            multiple
            name="columns"
            id="columns"
            onChange={(event) => {
              const options: HTMLOptionElement[] = Array.from(
                event.target.options
              );
              //@ts-ignore
              setColumns(options.filter((o) => o.selected).map((o) => o.value));
            }}
          >
            {columnsList.map(({ alias, name }) => (
              <option value={`${name} As '${escape(alias)}'`} key={name}>
                {alias}
              </option>
            ))}
          </select>
        </fieldset>
      )}
      {!isEmpty(columnsList) && (
        <>
          <QueryBuilder
            fields={fields}
            query={query}
            onQueryChange={setQuery}
            controlClassnames={{ queryBuilder: "queryBuilder-branches" }}
          />
          {isFetching ? (
            <FadeLoader color="#ed8615" />
          ) : (
            <button onClick={() => refetch()} disabled={isEmpty(columns)}>
              Envoyer la requette
            </button>
          )}
          {isResultError && <div>Error geting Result</div>}
        </>
      )}

      {resultQueryData && <Table data={resultQueryData?.data} />}
    </div>
  );
};
export default Dashboard;
