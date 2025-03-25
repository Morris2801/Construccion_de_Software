"use strict"
//import express library
import express from 'express'
import fs from 'fs'

//create a new express application
const app = express()

// define port to listen on 
const port = 3000

//use express.json() middleware to parse body of requests
app.use(express.json())

app.get('/', (req, res) =>{
    fs.readFile('./html/home.html', 'utf8',
        (err, html) => {
            if(err){
                res.status(500).send('There was an error: ' + err)
                return 
            }
            console.log("Sending page...")
            res.send(html)
            console.log("Page sent!")
        })
})


app.get('/person', (req, res) =>{
    console.log("Hello Server")
    
    const person = {
        name : "Mau", 
        email : "mauriciomonroyg@hotmail.com", 
        message: "Hello world from server"
    }
    
    res.json(person)
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})