const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

let shops = [];
let items = [];

app.get('/shops', (req, res) => {
    res.json(shops);
});

app.post('/shops', (req, res) => {
    const newShop = req.body;
    shops.push(newShop);
    res.status(201).json(newShop);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/shops/:shopId/Items', (req, res) => {
    const shopId = req.params.shopId;
    const shopItems = items.filter(item => item.shopId === shopId);
    res.json(shopItems);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
