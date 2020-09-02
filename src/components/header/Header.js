import React, { useState, useEffect } from "react";
import { Container, TextField, Avatar, Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { auth } from "../../firebase";
import ImageUploader from "../image-uploader/ImageUploader";
import PublishIcon from "@material-ui/icons/Publish";
import { Dropdown, Form, Col, Row } from "react-bootstrap";
import "./Header.scss";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [signIn, setSignIn] = useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleProfile = () => {
    console.log("here");
    setProfileOpen(true);
  };

  const submit = (event) => {
    event.preventDefault();
    if (signIn) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: username,
          });
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
    setOpen(false);
  };

  return (
    <header>
      {/* AUTHENTICATION MODAL */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="auth" noValidate autoComplete="off">
            <center>
              <img
                src={require("../../assets/images/logo.png")}
                alt=""
                className="auth__image"
              />
            </center>
            {signIn ? null : (
              <Input
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            )}
            <Input
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={submit}>
              {signIn ? "Login" : "Sign Up"}
            </Button>
          </form>
        </div>
      </Modal>
      {/* AUTHENTICATION MODAL */}

      {/* IMAGE UPLOADER MODAL */}
      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <ImageUploader username={user?.displayName} />
        </div>
      </Modal>
      {/* IMAGE UPLOADER MODAL */}

      {/* USER PROFILE MODAL */}
      <Modal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <Input
              defaultValue="Hello world"
              inputProps={{ "aria-label": "description" }}
            />
            <Input
              placeholder="Placeholder"
              inputProps={{ "aria-label": "description" }}
            />
            <Input
              defaultValue="Disabled"
              disabled
              inputProps={{ "aria-label": "description" }}
            />
            <Input
              defaultValue="Error"
              error
              inputProps={{ "aria-label": "description" }}
            />
          </form>
          
        </div>
      </Modal>
      {/* USER PROFILE MODAL */}

      <Container maxWidth="md">
        <div className="header">
          <div className="header__logo">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
          </div>
          <div className="header__controls">
            {user ? (
              <Button onClick={() => setUploadOpen(true)}>
                <PublishIcon />
              </Button>
            ) : (
              ""
            )}
            {user ? (
              <React.Fragment>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user?.displayName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleProfile}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => auth.signOut()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </React.Fragment>
            ) : (
              <div className="header_logincontainer">
                <Button
                  type="submit"
                  onClick={() => {
                    setSignIn(true);
                    handleOpen();
                  }}
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    setSignIn(false);
                    handleOpen();
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
