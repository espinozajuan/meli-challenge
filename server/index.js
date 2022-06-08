import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorMidddleware.js';
const port = process.env.PORT || 5000;

import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/items', productRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
