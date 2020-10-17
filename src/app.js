const data = require('./data/data1.json');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/:type', (req, res) => {
  const type = req.params.type
  const dataVideo = data.graphql.user.edge_felix_video_timeline.edges
  if (type === 'video') {
    res.json(
      dataVideo
    );
  }
  else if (type === 'new') {
    //edge_related_profiles
    res.json(
      data.graphql.user.edge_owner_to_timeline_media.edges
    );
  }
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
