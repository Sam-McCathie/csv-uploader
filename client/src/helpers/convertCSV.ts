export const convertCSV = (fileData: string) => {
  const rows = fileData.split("\n");

  // remove column headers if they exist - TODO: make more explicit
  if (rows[0].includes("Company Name")) {
    rows.shift();
  }

  const result = [];
  const headers = ["companyName", "employeeName", "emailAddress", "salary"];

  for (let i = 0; i < rows.length - 1; i++) {
    const rowData: Record<string, string> = {};
    const rowColumns = rows[i].split(",");

    // Create an object for each row with the headers as keys
    headers.forEach((header, index) => (rowData[header] = rowColumns[index]));

    result.push(rowData);
  }
  return result;
};
