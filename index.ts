// import { any, any } from "express"
// const {any,any} = require('express')
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const express = require("express");
const cors = require("cors");
// const User = require('./config')
// const firebase = require('./config')
const authApp = require("./config");
let User = authApp.Users;
const app = express();
const auth = require('./auth')
const port = 4000;
app.use(express.json());
app.use(cors());
// import "firebase/auth";
// import auth from './config'
// console.log("II", authApp.auth, "auth I");

// console.log(typeof(firebase.auth()),'authauth');

// import

app.post("/createUser", async (req: any, res: any) => {
  const data = req.body;
  console.log(data, "data");

  const user = await User.add(data);
  console.log(user, "user");

  res.send({ msg: "user addes" });
});

app.get("/users", async (req: any, res: any) => {
  try {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(list);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.patch("/user/:id", async (req: any, res: any) => {
  try {
    const data = req.body;

    const updatedUser = await User.doc(req.params.id).update(data);
    res.send({ msg: "user updated", updatedUser: updatedUser });
  } catch (error) {
    return res.send(error);
  }
});
app.delete("/user/:id", async (req: any, res: any) => {
  try {
    await User.doc(req.params.id).delete();
    res.send({ msg: "user deleted" });
  } catch (error) {
    return res.send(error);
  }
});

app.post("/register", async (req: any, res: any) => {
  try {
    const { email, username, password } = req.body;
    console.log(req.body, "body");

    authApp.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        return res.send(user);
      })
      .catch((error: any) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        return res.send(error);
      });
  } catch (e) {
    console.log(e);

    res.send(e);
  }
});

app.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  authApp.auth
    .signInWithEmailAndPassword(email, password)
    .then((user: any) => {
      // authApp.auth.currentUser.getIdToken(true).then((user:any)=>{

      //   // var user = userCredential.user;
      //   return res.send(user);
      // })
      console.log(user.user.uid, "user");

      authApp.admin
        .auth()
        .createCustomToken(user.user.uid)
        .then(function (customToken: any) {
          res.send(customToken);
        })
        .catch(function (error: any) {
          //Handle error
          console.log(error, "error");

          res.send(error);
        });
    })
    .catch((error: any) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage, "em");

      return res.send(errorMessage);
    });
  //   res.redirect("/");
});
app.get("/logout", function (req: any, res: any) {
  authApp.auth
    .signOut()
    .then(() => {
      return res.send("logout");
    })
    .catch((error: any) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return res.send(errorMessage);
    });
});
app.post("/loginWithGoggle", async (req: any, res: any) => {
  try {
    console.log(authApp.auth.createUser, "cure");

    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/drive");
    console.log("1", provider);

    const auth = getAuth();
    console.log(auth, "auht");

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        res.send(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage, "err");

        return res.send(errorMessage);
      });
  } catch (error) {
    console.log(error);

    return res.send(error);
  }
  //   res.redirect("/");
});
app.get("/tokenBasedApi",auth, function (req: any, res: any) {
  return res.send("hello token suucefuly based api");
});


app.listen(port, () => console.log(`Up & Running ${port}`));
