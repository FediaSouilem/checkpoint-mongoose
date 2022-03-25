const mongoose= require ('mongoose');
const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,// must have name
    },
    age: {
        type: Number,
    }
    ,
    favoriteFoods: {
        type: [String], // Array of string
    }
})
module.exports = mongoose.model('person', personSchema)