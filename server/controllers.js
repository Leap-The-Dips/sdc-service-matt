
const db = require('./db/models/index.js');

module.exports = {
  getAllRatings: (productId, callback) => {
    const p1 = db.Review.findAll({
      attributes: ['id', 'ratings', 'productId', 'isProductProp1Good', 'isProductProp2Good', 'isProductProp3Good'],
      where: {
        productId
      }
    });
    const p2 = db.Product.findOne({
      attributes: ['seller', 'prop1', 'prop2', 'prop3', 'productCondition'],
      where: {
        id: productId
      }
    });
    Promise.all([p1, p2])
      .then((res) => { callback(null, { reviews: res[0], productDetails: res[1] }); })
      .catch((err) => { console.log(err); callback(err); });
  },

  getReviews: (productId, pagingAndSorting, callback) => {
    // const p1 = db.Review.findAll({
    //   offset: pagingAndSorting.offset,
    //   limit: pagingAndSorting.limit,
    //   attributes: ['id', 'ratings', 'title', 'description', 'report_abuse', 'created_on', 'productId'],
    //   include: [{
    //     model: db.ReviewFeedback,
    //     attributes: ['isHelpful'],
    //     //Fix for sequelize postgres bug
    //     // where: { reviewId: db.Sequelize.col('reviews.id') } 
    //     where: db.Sequelize.where( db.Sequelize.col('ReviewFeedback.reviewId'), db.Sequelize.col('reviews.id') ),
    //   },
    //   {
    //     model: db.User,
    //     attributes: ['name'],
    //     //Fix bug
    //     // where: { userId: db.Sequelize.col('user.id') }
    //     where: db.Sequelize.where( db.Sequelize.col('ReviewFeedback.userId'), db.Sequelize.col('user.id') ),
    //     // separate: true
    //     // required: false
    //   }],
    //   order : [['created_on', 'DESC']],
    //   where: {
    //     productId
    //   }
    // });
    const p1 = db.sequelize.query(`SELECT t1.id, t1.ratings, t1.title, t1.description, t1.report_abuse, t1.created_on, t1.\"productId\", t1.name, \"ReviewFeedbacks\".\"isHelpful\" FROM (select reviews.id, reviews.ratings, reviews.title, reviews.description, reviews.report_abuse, reviews.created_on, reviews.\"productId\", reviews.\"userId\", users.name from reviews INNER JOIN users ON \"reviews\".\"userId\" = \"users\".\"id\" where \"reviews\".\"productId\" = 7 order by created_on desc offset ${pagingAndSorting.offset} rows limit ${pagingAndSorting.limit}) AS t1 INNER JOIN \"ReviewFeedbacks\" ON \"t1\".\"userId\" = \"ReviewFeedbacks\".\"userId\";`);
    const p2 = db.Product.findOne({
      attributes: ['seller', 'productCondition'],
      where: {
        id: productId
      }
    });
    Promise.all([p1, p2])
      .then((res) => { callback(null, { reviews: res[0][0], productDetails: res[1] }); })
      .catch((err) => { console.log(err); callback(err); });
  }, 

  createReview: (body, callback) => {
    db.Review.create(body)
    .then((res) => {
      console.log('New review created at ID: ', res.id);
      callback(null, res);
    })
    .catch((err) => { callback(err) });
  },

  updateReview: (body, callback) => {
    db.Review.update(body, {
      where: {
        id: body.id,
      }
    })
    .then((res) => {
      console.log('Updated review at ID: ', res.id);
      callback(null, res);
    })
    .catch((err) => { callback(err) });
  },

  deleteReview: (reviewID, callback) => {
    db.Review.destroy({
      where: {
        id: reviewID,
      }
    })
    .then((res) => { callback(null, res) })
    .catch((err) => { callback(err) });
  }
}