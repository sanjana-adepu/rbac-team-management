import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  
  const ReusableTable = ({ columns, data, onRowClick }) => {
    return (
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow
                  key={row._id}
                  hover
                  sx={{ cursor: onRowClick ? "pointer" : "default" }}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.field}>
                      {col.render
                        ? col.render(row)
                        : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default ReusableTable;