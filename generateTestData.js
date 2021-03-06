require("dotenv").config({ path: "./envs/.env.development" });
// require("dotenv").config({ path: "./envs/.env.production" });
const faker = require("faker");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant.entity");
const Manufacturer = require("./models/manufacturer.entity");

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB...");
  });

const main = async () => {
  for (let i = 0; i < 10; i++) {
    // restaurant
    const restaurant = await Restaurant.create({
      name: faker.name.findName(),
      postcode: faker.address.zipCode(),
      address: faker.address.streetAddress(),
      detail_address: faker.address.secondaryAddress(),
      cuisine: "korean",
      brand: faker.name.findName(),
      area: faker.finance.amount(),
      consumption: faker.finance.amount(),
    });
    // manufacturer
    const manufacturer = await Manufacturer.create({
      name: faker.name.findName(),
      postcode: faker.address.zipCode(),
      address: faker.address.streetAddress(),
      detail_address: faker.address.secondaryAddress(),
      production: faker.finance.amount(),
    });
  }
};

main()
  .then(() => {
    console.log("Succefully inserted test data into MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
