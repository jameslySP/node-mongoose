const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const vars = require('./vars');

const connect = mongoose.connect(vars.MONGO_URL, {useNewUrlParser: true});

connect.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test' }
        }, { 
            new:true
        }).exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'This dish is good',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.deleteOne({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});