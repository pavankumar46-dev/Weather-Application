const path = require('path')
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express()
const port = process.env.PORT || 3001

const index_path = path.join(__dirname,"../public")
const viewspath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")

//Serving static files
app.use(express.static(index_path))
//Engine Details
app.set("view engine","hbs")
//View directory path
app.set("views",viewspath)
hbs.registerPartials(partialspath)

app.get("",(req,res) => {
    res.render("index",{
        title:"Weather App",
        name:"Pavan Kumar Weather Application"
    })
})

app.get("/about",(req,res) => {
    res.render("about",{
        title:"About",
        name:"Pavan Kumar About Page"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        title:"help",
        name:"Pavan Kumar help page"
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error:"Kindly provide proper address"
        })
    }
    geocode(req.query.address,(latitude,longitude,placename) => {
        // if (error) {
        //     console.log(req.query.address)
        //     return res.send({error})
        // }
        forecast(latitude,longitude, (forecastData) => {
            // if (error) {
            //     return res.send({error})
            // }
            res.send({
                forecast:forecastData,
                address:"Place is "+req.query.address,
                placename:"Address is "+placename
            })
        })
    })
})


app.get('/help/*', (req,res) =>{
    res.render("404",{
        errorMessage:"Data not found under Help section"
    })
    })

//Need to place this route at last
app.get('*', (req,res) =>{
res.render("404",{
    errorMessage:"Page not found"
})
})

app.listen(port, () => {
    console.log("Server Started Successfully on "+port)
})