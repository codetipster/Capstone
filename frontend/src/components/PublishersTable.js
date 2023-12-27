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
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
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
      color: "gold",
    },
  },
});

export default function PublishersTable({ combinedData}) {
 // const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();


  const classes = useStyles();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      if (isMounted) {
        //setCoins(data);
        setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [currency]);
  

  const handleSearch = () => {
    return combinedData?.filter(
      (publisher) =>
        publisher.name.toLowerCase().includes(search) 
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        {/* <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Publishers Prices by Market Cap
        </Typography> */}
        <TextField
          label="Search For a Publisher.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#0405D2" }}>
                <TableRow>
                  {["Publisher", "View Rate", "Custom View Rate", "Action btn"].map((head) => (
                    <TableCell
                      style={{
                        color: "white",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Publisher" ? "" : "right"}
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
                    let todayViewRate = row?.todayAverages?.todayAverageViewRate >= 0;
                    let todayCustomViewRate = row?.todayAverages?.todayAverageCustomViewRate >= 0;
                    //console.log('row', row.todayAverages.todayAverageViewRate);
                    return (
                      <TableRow
                        onClick={() => navigate(`/publishers/${Number(row.id)}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "white" }}>
                              {row.name}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.id}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right" style={{
                            color: todayViewRate > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>
                          {todayViewRate && "+"}
                          {Number(parseFloat(row?.todayAverages?.todayAverageViewRate) * 100).toFixed(2)}%
                        </TableCell>

                        <TableCell
                          align="right"
                           style={{
                             color: todayCustomViewRate > 0 ? "rgb(14, 203, 129)" : "red",
                             fontWeight: 500,
                           }}
                        >
                          {/* {row.price_change_percentage_24h.toFixed(2)}% */}
                          {todayCustomViewRate && "+"}
                          {Number(parseFloat(row?.todayAverages?.todayAverageCustomViewRate) * 100).toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {/* <Select
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={currency}
                            style={{ width: 100, height: 40, marginLeft: 15 }}
                            // onChange={(e) => setCurrency(e.target.value)}
                          >
                            <MenuItem value={"Yesterday"}>Today</MenuItem>
                            <MenuItem value={"Yesterday"}>Yesterday</MenuItem>
                          </Select> */}
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
    padding: 20,
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