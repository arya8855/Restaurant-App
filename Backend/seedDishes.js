const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Dish = require('./models/Menu');

 dotenv.config({ path: path.resolve(__dirname, './.env') });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const results = [];

fs.createReadStream(path.join(__dirname, './restaurantMenu.csv'))
  .pipe(csv())
  .on('data', (data) => {
    const mappedData = {
      dishName: data.name,
      dishPrice: Number(data.price),
      dishPrepTime: Number(data.averageTime),
      dishCategory: data.category,
      image: data.image,
      description: data.description
    };
    results.push(mappedData);
  })
  .on('end', async () => {
    try {
      console.log('CSV Read Successfully. Total Dishes:', results.length);

      await Dish.deleteMany({});
      console.log('Old dishes cleared.');

      await Dish.insertMany(results);
      console.log('All dishes inserted successfully.');

      mongoose.connection.close();
    } catch (err) {
      console.error('Error inserting dishes:', err);
      mongoose.connection.close();
    }
  });
