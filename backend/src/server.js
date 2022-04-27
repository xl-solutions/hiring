import express from "express";
import cors from 'cors';

const corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

// Server listening on port 8080

app.listen("8080", () => {
    console.log("Server running on port 8080...");
})