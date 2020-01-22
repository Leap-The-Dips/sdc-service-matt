const fs = require('fs');
const faker = require('faker');

let writeStream = fs.createWriteStream('seedData.txt');

writeStream.write('ratings,title,description,product_id,user_id,report_abuse,isProductProp1Good,isProductProp2Good,isProductProp3Good,created_on\n');

let i = 0;

function write() {
  while (i <= 1e7) {
    let rating = Math.floor(Math.random() * 5);
    let title = faker.commerce.productName();
    let description = faker.lorem.sentences(Math.floor(Math.max(Math.random() * 5, 1)));
    let product_id = Math.floor(Math.max(Math.random() * 5000, 1));
    let user_id = Math.floor(Math.max(Math.random() * 100, 1));
    let report_abuse = Math.random > 0.5;
    let isProductProp1Good = Math.random > 0.5;
    let isProductProp2Good = Math.random > 0.5;
    let isProductProp3Good = Math.random > 0.5;
    let created_on = faker.date.past(5).toISOString();
  
    dataRow = `${rating},${title},${description},${product_id},${user_id},${report_abuse},${isProductProp1Good},${isProductProp2Good},${isProductProp3Good},${created_on}\n`;
  
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
