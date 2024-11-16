const jsonToCsv = (data: object[]) => {
  const headers = Object.keys(data[0]).join(","); // Create CSV headers
  const rows = data.map((row) => Object.values(row).join(",")); // Convert each row to a CSV string
  return [headers, ...rows].join("\n"); // Combine headers and rows
};

export const downloadcsv = (data: object[]) => {
  const csv = jsonToCsv(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `data.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
