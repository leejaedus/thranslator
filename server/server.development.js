import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/webpack.config.development';
import path from 'path';

const app = express();
const compiler = webpack(config);
const PORT = process.env.PORT || 3000;


const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

app.use(wdm);
app.use(webpackHotMiddleware(compiler));
app.set('view engine', 'html');
app.set('views', `${__dirname}/../src`);
app.engine('html', require('ejs').renderFile);

const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

app.use("/static", express.static(path.resolve(`${__dirname}/../static`)));
app.get("*", function(req, res) {
  res.render('index');
});

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
