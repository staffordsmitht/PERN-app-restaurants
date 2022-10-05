require('dotenv').config()
const express = require('express');
const cors = require("cors");
const db = require('./db');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());

// Get all Restaurants
app.get('/api/v1/restaurants', async (req,res) => {
    try {
        const results = await db.query('select * from restaurants')
        res.status(200).json({
         status: 'success',
         results: results.rows.length,
         data: {
             restaurants: results.rows}
    });
} catch (err) {
    console.log(err);
}
});


// Get a Restaurant 
app.get('/api/v1/restaurants/:id', async (req,res) => {
    console.log(req.params.id);

    try {
        const results = await db.query(
            `select * from restaurants where id = ${req.params.id}`
        );
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            },
        });

    } catch (err) {
        console.log(err);
    }
});

// Create a Restaurant 
app.post('/api/v1/restaurants', async (req,res) => {
    console.log(req.params.id)
    const insert = 'INSERT INTO restaurants(name, location) VALUES($1, $2) RETURNING *'
    try {
        const results = await db.query(
            insert, [
            req.body.name,
            req.body.location,
        ]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            },
        });

    } catch (err) {
        console.log(err);
    }
});



// Update a Restaurant
app.put('/api/v1/restaurants/:id', async (req,res) => {
    const update = 'UPDATE restaurants SET name = $1, location = $2 where id = $3 returning *'
    try {
        const results = await db.query(
            update, 
            [req.body.name,
            req.body.location,
            req.params.id]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Delete a Restaurant 
app.delete('/api/v1/restaurants/:id', async (req,res)=> {
    const deleted = 'DELETE FROM restaurants WHERE id = $1'
    try {
        const results = await db.query(
           deleted, 
            [req.params.id]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            },
        });

    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});