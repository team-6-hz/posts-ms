import { createClient } from '@supabase/supabase-js';
import key from './key.js';
import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { getPostData } from './controller.js';
import { postData } from './controller.js';
import { setupLogging } from './logging.js';
import { insertDataFromJSON } from './sbadptr.js';


const app = express();
const port = 3003;
setupLogging(app);
app.use(express.json()); // Middleware to parse JSON requests

app.get('/getPosts', cors(), getPostData);
app.post('/post', cors(), async (req, res) => {
    console.log(req.body);
    try {
        const result = await insertDataFromJSON(req.body);
        console.log(result);
        res.status(201).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/todos', cors(), (req, res) => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });



});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 