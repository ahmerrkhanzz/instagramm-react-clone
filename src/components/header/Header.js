import React, { useState, useEffect } from "react";
import {
  Container,
  InputLabel,
  TextField,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  Grid,
  FormControl,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { db, auth } from "../../firebase";
import ImageUploader from "../image-uploader/ImageUploader";
import PublishIcon from "@material-ui/icons/Publish";
import { Dropdown, Form, Col, Row, Image } from "react-bootstrap";
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
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
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
  const [userInfo, setUserInfo] = useState(null);
  const [signIn, setSignIn] = useState(false);

  // FORM FIELDS
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [image, setImage] = useState("");
  const [website, setWebsite] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [bio, setBio] = useState("");

  // LOGIN USER LISTENER
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

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          console.log(snapshot.data());
          setUserInfo(snapshot.data());
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    }
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

  const handleProfileImageChange = () => {
    console.log('here')
  }

  return (
    <header>
      {/* AUTHENTICATION MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
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
      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <ImageUploader username={user?.displayName} />
        </div>
      </Modal>
      {/* IMAGE UPLOADER MODAL */}

      {/* USER PROFILE MODAL */}
      <Dialog
        fullWidth={true}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      >
        <DialogContent dividers={true}>
          {userInfo ? (
            <Form className="profile">
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Profile Image
                </Form.Label>
                <Col sm={4}>
                  <Image src={userInfo.image} thumbnail />
                </Col>
                <Col sm={5}>
                  <input className="form-control" onChange={handleProfileImageChange} type="file" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    defaultValue={userInfo.name}
                    onChange={(event) => setProfileName(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Username
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    defaultValue={userInfo.username}
                    onChange={(event) => setProfileUsername(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Website
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Website"
                    defaultValue={userInfo.website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Bio
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    placeholder="Bio"
                    defaultValue={userInfo.bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    defaultValue={userInfo.email}
                    onChange={(event) => setProfileEmail(event.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit">Submit</Button>
                </Col>
              </Form.Group>
            </Form>
          ) : (
            "Loading..."
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
