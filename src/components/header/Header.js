import React from "react";
import { Container, TextField, Avatar } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <Container maxWidth="md">
        <div className="header">
          <div className="header__logo">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
          </div>
          <div className="header__search">
            <TextField
              label="Search field"
              type="search"
              size="small"
              variant="outlined"
            />
          </div>
          <div className="header__controls">
            <HomeOutlinedIcon />
            <ExploreOutlinedIcon />
            <FavoriteBorderOutlinedIcon />
            <Avatar alt="Ahmer Khan" src="/static/images/avatar/1.jpg" />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
