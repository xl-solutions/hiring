import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

// Use routers imported
app.use('/', router);

// Server listening on port 8080
app.listen("8080", () => {
    console.log("Server running on port 8080...");
});
