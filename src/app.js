const path = require('path')
const express = require('express')
const hbs = require('hbs') //for partials, handlebars
const geocode = require('../public/utils/geocode')
const forecast = require('../public/utils/forecast')

//initialize express application
const app = express()

//setup paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//handlebars config
app.set('view engine', 'hbs') //using handlebars template engine
app.set('views', viewsPath) //changing default views folder path to templates
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//defining routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Dit is de weer app.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about title',
        name: 'about name'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'help message',
        title: 'help title',
        name: 'help name'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'error = No address provided',
        })
    }
    else {    
        geocode(req.query.address, (geocodeError, data) => {
            if(geocodeError) {
                return res.send({
                    error: 'geocodeError = ' + geocodeError
                })
            }
            forecast(data.latitude, data.longitude, (forecastError, response) => {      
                if (forecastError) {
                    return res.send({
                        error: 'forecastError = ' + forecastError
                    })
                }          
                res.send({
                    latitude: data.latitude,
                    longitude: data.longitude,
                    location: data.location,
                    geocode_error: '' + (geocodeError ? geocodeError: 'No geocode errors'),
                    forecast_error: '' + (forecastError ? forecastError: 'No forecast errors'),
                    forecast: response
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    //console.log(req.query.search)
    //find "search" key value pair in a query requested from a browser
    if(!req.query.search) {
        //to avoid "cannot send headers twice" error
        return res.send({
            error: 'No search term provided'
        })
    }
    res.send({
        products: []
    })
})

//route error handling 
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help/* 404 message',
        title: 'Help/* title',
        name: 'Help/* name'
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 message',
        title: '404 title',
        name: '404 name'
    })
})

//starts the server, first arg is port number
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

