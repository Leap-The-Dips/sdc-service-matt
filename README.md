# Ratings and Reviews

A Mock service of e-bay ratings and reviews.

## Related Projects

  - https://github.com/rpt16Quarks/Dustins-front-end-capstone-service
  - https://github.com/rpt16Quarks/Service_Matt
  - https://github.com/rpt16Quarks/alexFEC
  - https://github.com/rpt16Quarks/vaishu-proxy

## Development

### Installing Dependencies

From within the root directory

npm install -g webpack
npm install nodemon
npm install babel-loader

## CRUD API

### Get all reviews for a product
GET - /reviews?prod_id=${id}

### Get ratings for a product
GET - /ratings?prod_id=${id}

### Create a new review
POST - /reviews
Body: {
  id: integer,
  ratings: integer,
  title: string,
  description: string,
  report_abuse: boolean,
  created_on: date time
  productId: integer,
  isProductProp1Good: boolean
  isProductProp2Good: boolean,
  isProductProp3Good: boolean,
}

### Update a review
PUT - /reviews
Body: {
  id: integer,
  ratings: integer,
  title: string,
  description: string,
  report_abuse: boolean,
  created_on: date time
  productId: integer,
  isProductProp1Good: boolean
  isProductProp2Good: boolean,
  isProductProp3Good: boolean,
}

### Delete a review
DELETE - /reviews
Body: { id: ${reviewID}}
