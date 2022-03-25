const express= require ('express');
const Person = require("./Models/Person");


const app = express();
app.use(express.json());
const dotenv = require ('dotenv');
dotenv.config();

//connecting to database
const connectDB = require('./helpers/connectDB');
connectDB();

const port = process.env.PORT;
app.listen(port, (err) =>
err ? console.log (err): console.log (`server is running on port ${port}`)
);
const person = new Person({
    name: "Fedia",
    age: 28,
    favoriteFoods: ["Healthy food", "smothies"],
});
person.save().then((doc) => {
console.log(doc);
 })
.catch((err) => console.error(err));
// Array of People
const arrayOfPeople = [
    {name: "Mary",age: 15,favoriteFoods: ["dark chocolate", "coffee"],},
    {name: "Zac",age: 1,favoriteFoods: ["oatmeal", "Soupe"],},
    { name: "Med", age: 24, favoriteFoods: ["fruits", "Tea"] },
];
// Add the array to the database using Person.create 
Person.create(arrayOfPeople, (err, data) => {
    if (err) {
        Person(err);
    }
    Person(data);
})
// Use Person.find() to Search on Database, all person
Person.find()
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => console.error(err));

    // Use model.findOne() to Return a Single Matching Document from  Database using the food argument

Person
    .findOne({ favoriteFoods: 'oatmeal' })
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => console.error(err));

    //Use model.findById() to Search Your Database By _id
    Person
    .findById({ _id: '5fef6670320a15441ead49f7' })
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => console.error(err));

    //Perform Classic Updates by Running Find, Edit, then Save
    Person
    .findById({ _id: '5fef6670320a15441ead49f7' })
    .then((doc) => {
        doc.favoriteFoods.push("hamburger")
        doc.save();
        console.log(doc);
    })
    .catch((err) => console.error(err));

    //Perform New Updates on a Document Using model.findOneAndUpdate()

    Person
    .findOneAndUpdate({ name: 'Fedia' }, { age: 20 }, { new: true })
    .then((doc) => {
        doc.save();
        console.log(doc);
    })
    .catch((err) => console.error(err));
    //Delete One Document Using model.findByIdAndRemove

    Person
    .findByIdAndRemove({ _id: '5fef6ff0932e905281c4dead' })
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => console.error(err));

    //MongoDB and Mongoose - Delete Many Documents with model.remove()
    Person
    .remove({ name: 'Mary' })
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => console.error(err));
    
    //Chain Search Query Helpers to Narrow Search Results

    var queryChain = function(done) {
        Person.find({favoriteFoods:"burrito"}).sort({name : "fedia"}).limit(2).select("-age").exec((err, data) => {
           if(err)
             done(err);
          done(null, data);
        })
      };