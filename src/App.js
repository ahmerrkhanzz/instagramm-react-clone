import React from "react";
import Header from "./components/header/Header";
import "./App.scss";
import { createMuiTheme, Container, Grid } from "@material-ui/core";
import Posts from "./components/posts/Posts";
import Sidebar from "./components/sidebar/Sidebar";

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
});

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={7} md={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
