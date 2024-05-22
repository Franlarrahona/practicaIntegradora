import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';


import config from './config.js';
import productsRouter from './routes/products.routes.js'
import viewsRouter from './routes/views.routes.js'

const app = express();

const httpInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI)
    console.log(`app funcionando en puerto ${config.PORT} conectada a bbdd`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `src/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/static', express.static(`src/public`));
