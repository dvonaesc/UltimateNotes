import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {notesRoutes} from './notesRoutes';

const app = express();

app.use(express.static(path.resolve('client')));

app.use(bodyParser.json());
app.use("/notes", notesRoutes);


const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});