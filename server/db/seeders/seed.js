const db = require('../models/index.js');
const UserMockData = require('./usersMockData.js');
const productSampleData = require('./productSampleData.js');
const reviewsSampleData = require('./reviewsSampleData.js');
const feedBackSampleData = require('./feedBackSampleData.js');
const imageSampleData = require('./imageSampleData.js');
const faker = require('faker');

db.sequelize
  // .query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
  // .then(() => db.sequelize.sync({ force: true }))
  .sync({ force: true })
  .then(() => db.User.bulkCreate(UserMockData))
  .then(() => {
    var productData = [];
    for (var i = 1; i <= 5000; i++) {
      productData.push({
        "id": i,
        "name": faker.commerce.productName(),
        "productCondition": Math.random() > 0.5 ? "new" : "used",
        "seller": faker.name.findName(),
        "prop1": faker.commerce.productAdjective(),
        "prop2": faker.commerce.productAdjective(),
        "prop3": faker.commerce.productAdjective(),
      })

    }
    return db.Product.bulkCreate(productData);
  })
  // .then(() => db.Review.bulkCreate(reviewsSampleData))
  // .then(() => db.sequelize.query("copy reviews (ratings,title,description,\"productId\",\"userId\",report_abuse,\"isProductProp1Good\",\"isProductProp2Good\",\"isProductProp3Good\",created_on) from '/Users/mattraetz/Documents/Hack Reactor/SDC/sdc-service-matt/seedData.txt' WITH DELIMITER ',' CSV HEADER"))
  .then(() => db.sequelize.query("copy reviews (ratings,title,description,\"productId\",\"userId\",report_abuse,\"isProductProp1Good\",\"isProductProp2Good\",\"isProductProp3Good\",created_on) from '/home/ec2-user/seedData.txt' WITH DELIMITER ',' CSV HEADER"))
  .then(() => db.sequelize.query("create index index_productid on reviews(\"productId\", created_on);"))
  .then(() => db.ReviewFeedback.bulkCreate(feedBackSampleData))
  .then(() => db.ReviewImage.bulkCreate(imageSampleData))
  .then(() => {
    db.sequelize.close();
  })
  .catch((err) => {
    console.error('Error in creating database', err);
  });
