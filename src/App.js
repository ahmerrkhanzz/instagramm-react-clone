import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import "./App.scss";
import {
  createMuiTheme,
  Container,
  Grid,
  MuiThemeProvider,
} from "@material-ui/core";
import { auth } from "./firebase";
import Posts from "./components/posts/Posts";
import Sidebar from "./components/sidebar/Sidebar";

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        // user is loggedin
        setUser(authUser);
      } else {
        // user is logged out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Container maxWidth="md">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={7} md={7}>
              <Posts user={user}/>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <Sidebar />
            </Grid>
          </Grid>
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
