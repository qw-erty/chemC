const express = require("Express");
const path = require("path");
// const { application } = require("Express");
const app = express();
// const Razorpay = require("razorpay")
// var instance = new Razorpay({
//     key_id: 'rzp_test_UHplnIW1cPsU6h',
//     key_secret: 'cecIQSr9kab2vbWxwdagFTLM',
// });

require('dotenv').config()

const mongoose = require("mongoose");
const { inflateRaw } = require("zlib");
const bodyparser = require("body-parser");

const MONGODB = process.env.MONGO_URL;
mongoose.connect(MONGODB,{useNewUrlParser:true});
mongoose.set('strictQuery',false);
const port = 8000;

// Define mongoose schema
var ContactSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    paytmphone: String,
    college:String,
    branch:String,
    year:String,
    state:String,
    
});

var Contact= mongoose.model('contact', ContactSchema);

// app.use(express.static('static', option))
app.use("/static", express.static('static'))
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine','pug')  /*Set the template engine as pug*/
app.set('Views' , path.join(__dirname,'Views' )) /*set the views directory*/

// Endpoints
app.get("/" ,(req,res)=>{
    const params = {}
    res.status(200).render('CC.pug' , params)
});
app.get("/CC" ,(req,res)=>{
    const params = {}
    res.status(200).render('CC.pug' , params)
});

app.get("/About",(req,res)=>{
    const params = {}
    res.status(200).render('About.pug' , params)
});

app.get("/Sche",(req,res)=>{
    const params = {}
    res.status(200).render('Sche.pug' , params)
});

app.get("/event",(req,res)=>{
    const params = {}
    res.status(200).render('event.pug' , params)
});

app.get("/Comp",(req,res)=>{
    const params = {}
    res.status(200).render('Comp.pug' , params)
});

app.get("/sponsors",(req,res)=>{
    const params = {}
    res.status(200).render('sponsors.pug' , params)
});

app.get("/contact",(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug' , params)
});

app.get("/Team",(req,res)=>{
    const params = {}
    res.status(200).render('Team.pug' , params)
});
app.get("/pay",(req,res)=>{
    const params = {}
    res.status(200).render('pay.pug' , params)
});



app.post("/contact", (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.render("payment.pug")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
   });

// app.post('/create/orderID', (req, res) => {
//     console.log("create orderID request",req.body);
//     var options = {
//         amount: req.body.amount,
//         currency: "INR",
//         receipt: "rcp1"

//     };
//     instance.orders.create(options, function(err, order) {
//         console.log(order);
//         res.send({orderId : order.id});
//     });
// })

// Start the Server
app.listen(port, () =>{
 console.log('This application is started successfully on port $(port)');
});


