var __dirname = path.resolve(path.dirname(''));
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: __dirname + '/.env' });
import express from 'express';
import mongoose from 'mongoose';
import https from 'https';
import http from 'http';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import passport from 'passport';
import all_routes from 'express-list-endpoints';

import routes from './routes/index.js';
import { seedDb } from './utils/seed.js';

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
import './services/jwtStrategy.js';
import './services/facebookStrategy.js';
import './services/googleStrategy.js';
import './services/localStrategy.js';

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
    seedDb();
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);
app.use('/public', express.static(join(__dirname, '../public')));

// Serve static assets if in production
if (isProduction) {
  // Set static folder
  app.use(express.static(join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../..', 'client', 'build', 'index.html')); // index is in /server/src so 2 folders up
  });

  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;

  // const httpsOptions = {
  //   key: readFileSync(resolve(__dirname, '../security/cert.key')),
  //   cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
  // };

  const server = http.createServer(app).listen(port, () => {
    console.log('https server running at ' + port);
    // console.log(all_routes(app));
  });
}
