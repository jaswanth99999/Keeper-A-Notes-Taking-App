import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { BSON, EJSON, ObjectId } from 'bson'
import passport from "passport";
// const GoogleStrategy = require('passport-google-oauth20').Strategy;/
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';
// const findOrCreate = require('mongoose-findorcreate');

const saltRounds = 10;

const app = express();
const port = 3001;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json());
const url = "mongodb://127.0.0.1:27017/userDB"
mongoose.connect(url).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    notes: [{ title: String, content: String }]
});
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);
passport.use(new GoogleStrategy({
    clientID: "825895568644-4733ftjvf1u483umfebp6dpj0v3bmrk7.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/keeper",
    userProfileURL: "http://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
app.get('/api/data', (req, res) => {
    // Handle your API logic here 
    res.json({ message: 'Hello from Express!' });
});

app.get("/auth/google", function(req, res) {
    passport.authenticate("google", {scope: ['profile']});
})

app.post("/register", (req, res) => {
    User.findOne({ email: req.body.username }).then(foundUser => {
        console.log(foundUser);
        if(foundUser === null) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                const newUser = new User({
                    email: req.body.username,
                    password: hash
                });
                console.log(req.body.username);
        
                newUser.save().then(() => {
                    res.status(200).send({ message: "Registered Successfully..", userId: newUser.id })
                }).catch((e) => {
                    console.log('There was an error', e.message);
                });
        
            })
        }
        else {
            res.send("User Exists");
        }
    })
    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    //     console.log(hash)
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash
    //     });
    //     console.log(req.body.username);

    //     newUser.save().then(() => {
    //         res.status(200).send({ message: "Registered Successfully..", userId: newUser.id })
    //     }).catch((e) => {
    //         console.log('There was an error', e.message);
    //     });

    // })
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username }).then(foundUser => {
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, function (err, result) {
                if (result) {
                    res.status(200).send({ message: "logged in..", userId: foundUser.id })
                }
                else {
                    console.log("Auth Failed..")
                    res.status(401).send({ message: "Authentication Failed..." })
                }
            })
        }
    })
})

app.get("/notes/:id", (req, res) => {
    const nid = new BSON.ObjectId(req.params.id)
    User.findOne({ _id: nid }).then(foundUser => {
        if (foundUser) {
            res.send({ notes: foundUser.notes });
        }
        else {
            console.log("User Not Found")
            res.status(401).send({ message: "User not Found" })
        }
    })
})

app.post("/notes/:id", (req, res) => {
    const nid = new BSON.ObjectId(req.params.id)
    const newNotes = req.body.notes;
    try {
        User.updateMany({ _id: nid }, { $set: { notes: newNotes } }).then(docs => {
            console.log("Updated Docs : ", docs);
            res.status(200).send({ "Updated Docs": docs })
        })
    }
    catch (err) {
        console.log("Err : ", err);
        res.status(400).send("Error Updating the Array..    ")
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});