import express from 'express';
import dotenv from 'dotenv';
import logger from './logger.js';
import morgan from 'morgan';




const app = express();

const morganFormat = ':method :url :status :res[content-length] - :response-time ms';

app.use(morgan(morganFormat, {
    stream:
    {
        write: message => logger.info(message.trim())
    }
}));
logger.info("Morgan middleware has been set up");


const PORT = process.env.PORT || 3000;


app.use(express.json());

let teadata = [];
let nextId = 1;


app.post("/teas", (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price };
    teadata.push(newTea);
    res.status(201).send(newTea);
});

app.get("/teas", (req, res) => {
    res.send(teadata);
});

app.get("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teadata.find(t => t.id === id);
    if (tea) {
        res.send(tea);
    } else {
        res.status(404).send({ message: "Tea not found" });
    }
});


//update tea
app.put("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tea = teadata.find(t => t.id === id);
    if (tea) {
        const { name, price } = req.body;
        tea.name = name || tea.name;
        tea.price = price || tea.price;
        res.send(tea);
    } else {
        res.status(404).send({ message: "Tea not found" });
    }
});

//delete tea
app.delete("/teas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = teadata.findIndex(t => t.id === id);
    if (index !== -1) {
        teadata.splice(index, 1);
        res.send({ message: "Tea deleted" });
    }
    else {
        res.status(404).send({ message: "Tea not found" });
    }
});


app.get('/', (req, res) => {
    res.send('<h1>Welcome to Express Server</h1>');
});

app.get('/ice-tea', (req, res) => {
    res.send('<h1>What Ice Tea would you fevar?</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});