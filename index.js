const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test');

main()
    .then(()=> {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema= new mongoose.Schema({
  name:String,
  email:String,
  age:Number,
});


const User = mongoose.model("User",userSchema);


User.deleteOne({_id:"66a13e7fe099891127133007"}).then((res)=>{
  console.log(res);}
).catch((err)=>{
  console.log(err);
});

// User.findByIdAndDelete("66a25e825a303562ea58949c").then((res)=>{
//   console.log(res);}
// ).catch((err)=>{
//   console.log(err);
// });



// const user1= new User({
//   name:"nayab",
//   email:"nayab123@gmail.com",
//   age:21,
// })

// user1.save()
//   .then((res)=>{
//     console.log(res);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });
  

