const express = require("express")
const routes =require("./routes/main")
const hbs = require("hbs")
const mongoose =require("mongoose")
const Database = require("./db")

const port =3000
const app = express()

app.use('/static',express.static("public"))
app.use('/',routes)
Database._connect()

// template engine
app.set('view engine','hbs')
app.set("views","views")


app.listen(process.env.PORT | port, ()=>{
    console.log(`server started at port no: ${port}`);
})


