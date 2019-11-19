const express = require('express');
const service = require('./controllers.js');
const bodyParser = require('body-parser');

const app = express();
express.json();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ratings', (req, res) => {
  service.getAllRatings(req.query.prod_id, (err, ratings) => {
    if (err) {
      res.sendStatus(400);
      return;
    }
    res.status(200).send(ratings);
  });
});

app.get('/reviews', (req, res) => {
  //console.log(req);
  console.log('------------------->',req.query);
  const pagingAndSorting = {
    offset: +req.query.offset,
    limit: +req.query.limit
  };
  service.getReviews(req.query.prod_id, pagingAndSorting, (err, ratings) => {
    if (err) {
      res.sendStatus(400);
      return;
    }
    res.status(200).send(ratings);
  });
});

app.post('/reviews', (req, res) => {
  console.log('Reviews post body: ', req.body);
});

app.put('/reviews', (req, res) => {
});

app.delete('/reviews', (req, res) => {
  //need reviewID from client (INT)
  console.log('Delete review: ', req.body.id);

  service.deleteReview(req.body.id, (err, rows) => {
    if (err) {
      res.sendStatus(400);
      return;
    }
    res.sendStatus(200);
  })
});

module.exports = app;
