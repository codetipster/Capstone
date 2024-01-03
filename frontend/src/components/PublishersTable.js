import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";


import image from '../assets/aaa.jpeg';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "white",
    },
  },
});



export default function PublishersTable({sizes}) {
 console.log('sizes from table',sizes)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  


  const classes = useStyles();
  

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


  

  const handleSearch = () => {
    return sizes?.filter(
      (size) =>  size.size.toLowerCase().includes(search)
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        
        {/* <TextField
          label="Search For a Publisher.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#0405D2" }}>
                <TableRow>
                  {["Size", "View Rate", "Custom View Rate", "Impressions", "Impression Type"].map((head) => (
                    <TableCell
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Size" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    let ViewRate = row?.view_rate >= 0;
                    let CustomViewRate = row?.custom_view_rate >= 0;
                    let Impressions = row?.impressions >= 0;
                    
                    return (
                      <TableRow
                        
                        className={classes.row}
                        key={row.size}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 10,
                          }}
                        >
                          {/* <img
                            src={image}
                            alt='logo'
                            height="30"
                            style={{ marginBottom: 5 }}
                          /> */}
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ color: "darkgrey" }}>
                              {row.size}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right" style={{
                            color: ViewRate > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>
                          {ViewRate && "+"}
                          {Number(parseFloat(row?.view_rate) * 100).toFixed(2)}%
                        </TableCell>

                        <TableCell
                          align="right"
                           style={{
                             color: CustomViewRate > 0 ? "rgb(14, 203, 129)" : "red",
                             fontWeight: 500,
                           }}
                        >
                          
                          {CustomViewRate && "+"}
                          {Number(parseFloat(row?.custom_view_rate) * 100).toFixed(2)}%
                        </TableCell>

                        <TableCell
                          align="right"
                           style={{
                             color: Impressions > 0 ? "rgb(14, 203, 129)" : "red",
                             fontWeight: 500,
                           }}
                        >
                          
                          {Impressions && "+"}
                          {Number(parseFloat(row?.impressions))}
                        </TableCell>

                        <TableCell
                          align="right"
                        >
                          {row?.impression_type}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
  count={Math.ceil(handleSearch()?.length / 10)}
  style={{
    padding: 10,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }}
  classes={{ ul: classes.pagination }}
  onChange={(_, value) => {
    setPage(value);
    window.scroll(0, 450);
  }}
/>

      </Container>
    </ThemeProvider>
  );
}