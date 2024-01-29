require('dotenv').config()
const express = require ('express')
const cors = require ('cors')
const dbConnect = require ('./config/mongo')
const app = express()


app.use(cors())
app.use(express.json())

const port = process.env.PORT_DB || 3000


/** 
 * Rutas
 */
app.use('/api',require('./routes/tasks'))

app.listen(port, () => { 
    console.log('Tu app esta lista por http://localhost:'+port)
})

dbConnect()