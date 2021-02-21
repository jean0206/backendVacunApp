const express=require('express')

const mongoose = require("mongoose");
const dataRoutes = require('./routes/stateRoutes')
const userRoutes = require('./routes/userRoutes')
var cors = require('cors')
const bodyParse = require("body-parser");


require("dotenv/config");

const app2=express()


app2.use(cors())
app2.use(bodyParse.json());
app2.use('/state',dataRoutes)
app2.use('/user',userRoutes)
app2.use(express.json())

mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      console.log("conectado a la base de datos!");
    }
  );



const portback=3030
app2.listen(process.env.PORT ||portback)
