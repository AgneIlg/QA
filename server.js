const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let shops = [
    { id: 1, address: "123 Main St", shopName: "Toy Land" },
    { id: 2, address: "456 Elm St", shopName: "Fun Zone" },
    { id: 3, address: "789 Oak St", shopName: "Play Palace" },
    { id: 4, address: "101 Maple St", shopName: "Kids Haven" },
    { id: 5, address: "202 Pine St", shopName: "Wonder World" }
];
let items = [
    { id: 1, name: "Teddy Bear", price: 15.99 },
    { id: 2, name: "LEGO Set", price: 29.99 },
    { id: 3, name: "Barbie Doll", price: 12.99 },
    { id: 4, name: "Remote Control Car", price: 24.99 },
    { id: 5, name: "Board Game", price: 19.99 }
];

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

// app.get('/shops/:shopId/items', (req, res) => {
//     const shopId = req.params.shopId;
//     const shopItems = items.filter(item => item.shopId === shopId);
//     res.json(shopItems);
// });

app.get('/shops/:shopId/items', (req, res) => {
    const shopId = req.params.shopId;
    
    // Find the shop by ID
    const shop = shops.find(shop => shop.id === parseInt(shopId));
    if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
    }

    // Filter items by shop ID
    const shopItems = items.filter(item => item.shopId === parseInt(shopId));
    
    res.json(shopItems);
});


// Update shop with new pet items
app.put('/shops/:shopId/items', (req, res) => {
    const shopId = req.params.shopId;
    const newItems = req.body;
    
    // Find the shop by ID
    const shopIndex = shops.findIndex(shop => shop.id === shopId);
    if (shopIndex === -1) {
        return res.status(404).json({ error: 'Shop not found' });
    }

    // Add new items to the shop
    shops[shopIndex].items = shops[shopIndex].items.concat(newItems);
    
    res.json(shops[shopIndex]);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
