const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/gecode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Home',
        username : 'Hanuman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        username : 'Hanuman'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        username : 'Hanuman'
    })
})
app.get('/weather', (req, res) => {
    let queryString = req.query.address
    if(!queryString) return res.send({error: 'You must provide address'})
    geocode(queryString, (err, {lati, lang, location} = {}) => {
        if(err) {
            return res.send({
                error : err
            })
        } else 
        {
            forecast(lati, lang, (err, {temperature, feelslike} = {}) => {
                if(err) {
                    return res.send({
                        error:err
                    })
                }
                else {
                    console.log(temperature);
                    res.send({
                        temperature: temperature,
                        feelslike: feelslike,
                        location: location
                    })
                }
            })
        }
    })
    // console.log(req.query);
    // res.send({
    //     name : 'hanuman',
    //     age : 26,
    //     address : queryString
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })

    }
    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('*', (req, res) => {
    res.render('_404')
})

app.listen(port, () => {
    console.log('Server runnning is running on '+port);
})