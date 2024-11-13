import { useState } from "react";
import type { RuleGroupType } from "react-querybuilder";
import { QueryBuilder } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { fields } from "../fields";

const initialQuery: RuleGroupType = { combinator: "and", rules: [] };

const Dashboard = () => {
  const [query, setQuery] = useState(initialQuery);
  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={setQuery}
      controlClassnames={{ queryBuilder: "queryBuilder-branches" }}
    />
  );
};
export default Dashboard;
