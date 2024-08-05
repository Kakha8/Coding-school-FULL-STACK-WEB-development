import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import URL module for ES modules
import router from './routes/userRoutes.js';

const app = express();
const port = 3000;

// Necessary for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Set up body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});