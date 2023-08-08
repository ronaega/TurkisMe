const express = require('express')
// const expressLayouts = require('express-ejs-layouts')

const port = 3000
const app = express()

app.set('view engine', 'ejs')

// app.use(expressLayouts)
app.use(express.static('public'))

// app.use('index', require('./controller/index'))
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`);
})