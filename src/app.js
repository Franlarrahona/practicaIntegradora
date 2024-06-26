import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import fileStore from 'session-file-store';
import passport from 'passport';


import config from './config.js';
import productsRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';
import cartsRouter from './routes/carts.routes.js';
import sessionRouter from './routes/sessions.routes.js';

const app = express();

const httpInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI)
    console.log(`app funcionando en puerto ${config.PORT} conectada a bbdd`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileStorage = fileStore(session)
app.use(session({
    store: new fileStorage ({path: './sessions', ttl:100, retries: 0}),
    secret: config.SECRET,
    resave:true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', `src/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/session', sessionRouter)
app.use('/static', express.static(`src/public`));
