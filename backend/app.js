var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
const passport = require('passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const authRouters = require('./routes/auth');
const session = require('express-session');
//product
const productRoutes = require('./routes/productRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const favorisRoutes = require('./routes/favorisRoutes');
const commentRoutes = require('./routes/commentRoutes');
const basketRoutes = require('./routes/basketRoutes');
const stripe = require('./routes/stripe');
const deliveryRoutes = require('./routes/deliveryRoutes');

const cron = require('node-cron');
const sendEmailProduct = require('./utils/sendEmailProduct');
const automaticUpdateProduct = require('./utils/automaticUpdateProduct');
const sendEmailToUsers = require('./utils/sendEmailToUsers');

const Report = require('./routes/Report');
const Rate = require('./routes/Rate');
var app = express();
const recipeRoute = require('./routes/recipeRoute');

app.use(
  cookieSession({ name: 'session', keys: ['lama'], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'https://the-bosses-pi-dev-h2f8.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(logger('dev'));

app.use(express.json({ limit: '50mb', extended: true }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouters);
app.use(passport.initialize());
//require('./passport')(passport)
app.use(passport.session());
require('./security/passport')(passport);

/* connect to db */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));

app.use('/support', Report);
app.use('/rate', Rate);
app.use('/api', indexRouter);
app.use('/product', productRoutes);
app.use('/gallery', galleryRoutes);
app.use('/favoris', favorisRoutes);
app.use('/comment', commentRoutes);
app.use('/basket', basketRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/stripe', stripe);

app.use('/recipe', recipeRoute);

// cron.schedule("*/2 * * * *", () => {
//   sendEmailProduct();
//   console.log("heyy1");
// });
// cron.schedule("*/0.3 * * * *", () => {
//   automaticUpdateProduct();
//   console.log("heyy2");
// });
// cron.schedule("*/2 * * * *", () => {
//   sendEmailToUsers();
//   console.log("heyy3");
// });

module.exports = app;
