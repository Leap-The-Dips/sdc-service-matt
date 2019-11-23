const fs = require('fs');
const faker = require('faker');

let writeStream = fs.createWriteStream('seedData.txt');

writeStream.write('ratings, title, description, product_id, user_id, report_abuse, isProductProp1Good, isProductProp2Good, isProductProp3Good\n');

let rating = Math.floor(Math.random() * 5);
let title = faker.commerce.productName();
let description = faker.lorem.sentences(Math.floor(Math.max(Math.random() * 5, 1)));
let product_id = Math.floor(Math.random() * 100);
let user_id = Math.floor(Math.random() * 100);
let report_abuse = Math.random > 0.5;
let isProductProp1Good = Math.random > 0.5;
let isProductProp2Good = Math.random > 0.5;
let isProductProp3Good = Math.random > 0.5;
let dataRow = ``;
let i = 0;

function write() {
  while (i <= 1e7) {
    rating = Math.floor(Math.random() * 5);
    title = faker.commerce.productName();
    description = faker.lorem.sentences(Math.floor(Math.max(Math.random() * 5, 1)));
    product_id = Math.floor(Math.random() * 100);
    user_id = Math.floor(Math.random() * 100);
    report_abuse = Math.random > 0.5;
    isProductProp1Good = Math.random > 0.5;
    isProductProp2Good = Math.random > 0.5;
    isProductProp3Good = Math.random > 0.5;
  
    dataRow = `${rating}, ${title}, ${description}, ${product_id}, ${user_id}, ${report_abuse}, ${isProductProp1Good}, ${isProductProp2Good}, ${isProductProp3Good}\n`;
  
    if (!writeStream.write(dataRow)) {
      return;
    };
    i += 1;
  }
  writeStream.on('finish', () => {
    console.log('Finished writing to data file.');
  })
  writeStream.end();
}

writeStream.on('drain', write);
write();


//csv data format
// id, ratings, title, description, product_id, user_id, report_abuse, isProductProp1Good, isProductProp2Good, isProductProp3Good