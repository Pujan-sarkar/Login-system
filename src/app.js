const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("/config");
const { name } = require('ejs');

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));


app.set ('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("login");
});

app.get("/signup", (req,res) => {
    res.render("signup");
});

app.post("/signup", async (req,res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

const existuser = await collection.findOne({name: data.name});
if(existuser) {
    res.send("User is already exists. Please choose another username")
}else {
    const saltrounds = 10; 
    const hashpass = await bcrypt.hash(data.password, saltrounds);

    data.password = hashpass;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
}

   
});

app.post("/login", async(res,req) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }
        const ispasswordmatch = await bcrypt.compare(req.body.password, check.password);

        if (ispasswordmatch) {
            res.render("home");
        }else{
            req.send("Wrong password")
        }
    }catch{
        res.send("wrong details");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`server running on ${port}`);
})