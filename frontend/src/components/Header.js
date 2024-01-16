/* eslint-disable react/react-in-jsx-scope */
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import {
    createTheme,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";
  
  import { useNavigate } from "react-router-dom";
  
  
  const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: "white",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  
  function Header() {
    const classes = useStyles();
    const navigate = useNavigate();
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate("/")}
                variant="h6"
                className={classes.title}
              >
                AdTech
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
              {/* <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                // onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"Login"}>Login</MenuItem>
                <MenuItem value={"Logout"}>Logout</MenuItem>
              </Select> */}
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;