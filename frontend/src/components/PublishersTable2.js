/* eslint-disable react/prop-types */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function DenseTable({ sizes }) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell align="right">View Rate</TableCell>
              <TableCell align="right">Custom View Rate</TableCell>
              <TableCell align="right">Impressions</TableCell>
              <TableCell align="right">Impression Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.map((row) => (
                
              <TableRow
                key={row.size}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.size}
                </TableCell>
                <TableCell align="right" style={{
                            color: row.view_rate > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>{Number(parseFloat(row?.view_rate) * 100).toFixed(2)}%</TableCell>
                <TableCell align="right" style={{
                            color: row.custom_view_rate > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>{Number(parseFloat(row?.custom_view_rate) * 100).toFixed(2)}%</TableCell>
                <TableCell align="right" style={{
                            color: row.impressions > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>{row.impressions}</TableCell>
                <TableCell align="right">{row.impression_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }