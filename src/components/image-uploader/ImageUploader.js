import React, { useState } from "react";
import { storage, db } from "../../firebase";
import firebase from 'firebase'

const ImageUploader = ({username}) => {
  console.log(username)
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
    console.log(image);
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
              db.collection('posts').add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  imageUrl: url,
                  caption: caption,
                  username: username
              })
              setProgress(0)
              setCaption('')
          });
      }
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter caption"
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <progress value={progress} max='100' />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
