const express = require("express")
const bodyParser=require('body-parser')
const Sequelize = require("sequelize")



const sequelize =new Sequelize('cupoane_bd','root','',{
    dialect: 'mysql',
    host:'localhost'
})


const Cupoane=sequelize.define('cupoane',{
    numar_curent: Sequelize.INTEGER,
    nume_cupon:Sequelize.STRING,
    nume_locatie:Sequelize.STRING,
})


const Locatii=sequelize.define('locatii',{
    nr_crt:Sequelize.INTEGER,
    nume_locatie:Sequelize.STRING,
    tip_locatie:Sequelize.STRING
})

//definire legatura 1:m intre locatii has many cupoane
Locatii.hasMany(Cupoane,{foreignKey: 'fk_nume_locatie'})

const app=express();
app.use(bodyParser.json());

app.get('/createCupoane',(req,res)=>{
    sequelize.sync({force:true})
    .then(()=>res.status(201).send('tabela cupoane creata'))
    .catch(()=>res.status(500).send('eroare creare cupoane'))
})

app.get('/cupoane',function(request,response)
{
    Cupoane.findAll().then(function(cupoane)
    {
        response.status(200).send(cupoane)
    })
})

app.get('/createLocatii',(req,res)=>{
    sequelize.sync({force:true})
    .then(()=>res.status(201).send('tabela Locatii creata'))
    .catch(()=>res.status(500).send('eroare creare Locatii'))
})

app.get('/locatii',function(request,response)
{
    Locatii.findAll().then(function(locatii)
    {
        response.status(200).send(locatii)
    })
})

app.post('/cupoane/new', function(request, response) {
    Cupoane.create(request.body).then(function(cupoane) {
        response.status(201).send(cupoane)
    })
})

app.post('/locatii/new',function(request,response){
    Locatii.create(request.body).then(function(locatii){
        response.status(201).send(locatii)
    })
})

app.delete('/cupoane/:id', (req,res)=>
{
    Cupoane.findById(req.params.id).then((cupoane)=>{
        if(cupoane){
            return cupoane.destroy()
        }
        else
        {
            res.status(404).send("Nu am gasit cuponul!")
        }
    }).then(()=>res.status(201).send('Destroyed')).catch(()=>res.status(500).send("Eroare tabela Cupoane!"))
})

app.delete('/locatii/:id', (req,res)=>
{
    Locatii.findById(req.params.id).then((locatii)=>{
        if(locatii){
            return locatii.destroy()
        }
        else
        {
            res.status(404).send("Nu am gasit locatia!")
        }
    }).then(()=>res.status(201).send('Destroyed'))
    .catch(()=>res.status(500).send("Eroare tabela Locatii!"))
})

app.put('/cupoane/:id', function(request, response) {
    Cupoane.findById(request.params.id).then(function(cupoane) {
        if(cupoane) {
            cupoane.update(request.body).then(function(cupoane){
                response.status(201).send(cupoane)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.put('/locatii/:id', function(request, response) {
    Locatii.findById(request.params.id).then(function(locatii) {
        if(locatii) {
            locatii.update(request.body).then(function(locatii){
                response.status(201).send(locatii)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
        
app.listen(8080)