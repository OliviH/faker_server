const app = require('express')()
const faker = require('faker')
const cors = require('cors')
const bodyParser = require('body-parser')

faker.locale = "fr"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req,res) => {
    let resp = []
    if(req.query.nb){
        if(parseInt(req.query.nb)>1){
            for (let i = 0; i < (parseInt(req.query.nb)-1); i++){
                let newresp = faker.helpers.createCard()
                newresp.events = []
                newresp.events.push({date:faker.date.between('2020-01-01', '2020-07-25'), evenement:faker.lorem.sentence(), desc:faker.lorem.paragraphs()})
                resp.push(newresp)
            }
        }
    }
    resp.push(faker.helpers.createCard())
    res.status(200).json(resp)
})

app.listen(3003)