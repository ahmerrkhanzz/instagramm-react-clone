import React, { useState } from "react";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import { TextField, Button, LinearProgress } from "@material-ui/core";
import "./ImageUploader.scss";

const ImageUploader = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    console.log(event);
    if (event.target.files[0]) {
      console.log(event);
      setImage(event.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // upload progress calculation block
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        // error catch block
        console.log(err);
      },
      () => {
        // completion block
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              caption: caption,
              username: username,
            });
            setProgress(0);
            setCaption("");
          });
      }
    );
  };

  return (
    <div className="uploader">
      {/* <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      /> */}
      <LinearProgress variant="determinate" value={progress} />
      <input type="file" onChange={handleChange} />
      <TextField
        placeholder="Enter caption"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <Button
        onClick={handleUpload}
        color="primary"
        disabled={!caption || !image}
      >
        Upload
      </Button>
    </div>
  );
};

export default ImageUploader;
