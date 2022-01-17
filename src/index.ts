 import express,{ Request,Response,NextFunction} from 'express';
import Joi from 'joi';
import {append} from 'vary';
import debug from 'debug';
import repl from 'repl';

const app = express()

const replServer = repl.start({
    prompt: ":)"
})

app.use(express.json());
app.use(express.json());


interface personInterface{
    id:number;
    name:string;
    age:number;
    address:{
        city:string;
        Street:string;
            phone:number;
    }
}
let persons:personInterface[] = [{
        id: 1,
        name: 'reza',
        age: 20,

        address: {
            city: 'mashad',
            Street: 'gharb street',
            phone: 9125469873,
        },
    },
    {
        id: 2,
        name: 'model',
        age:50,
        address: {
            city: 'mashad',
            Street: 'gharb street',
            phone: 9125469872,
        },
    }

]

app.get('/', (req:Request, res:Response) => {
    const h1=`<h1>'Welcome To Boooks Lib'</h1>`
    res.send(h1)
})


app.get('/api/persons', (req, res) => {
    res.send(persons)

})
app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(x => x.id === parseInt(req.params.id));
    if (!person) {
        res.status(404).send('person not found')
    }
    res.send(person);
})


app.post('/api/persons', (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).send('person name must be defined')
    }
    const person:personInterface = {
        id: persons.length + 1,
        name: req.body.name,
        age: 20,
        address: {
            city: '',
            Street: '',
            phone:09150000000 
        }
    }
    persons.push(person)
    res.send(person);
})

app.put('/api/persons/:id', (req, res) => {
    const person = persons.find(x => x.id === parseInt(req.params.id))
    if (!person) {
        return res.status(404).send('person not found')
    }
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().required(),
        address: {
            city: Joi.string().required(),
            street: Joi.string().required(),
            phone: Joi.number().required(),
        }
    })

    const result = schema.validate(req.body)
    console.log(result);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message)

    }
    person.name = req.body.name;
        person.age = req.body.age
        person.address = req.body.address
    res.send(person)
})
app.delete('/api/persons/:id', (req, res) => {
    console.log(req.body);
    const person = persons.find(x => x.id === parseInt(req.params.id))
    if (!person) {
       return  res.status(404).send('person not found')
    }
    if(person){
    const index = persons.indexOf(person)
    persons.splice(index, 1)
    res.send(`person: ${person.name} delete now`)
    }
})
console.log(app.get("env"));
const port=process.env.PORT|| 3000;
app.listen(port, () => {
    console.log('server listen on port 3000');
})