const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main()
    .then((res)=>{
        console.log("Connected to MongoDB");  
    })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

 let allChats= [
    {
        from:"nayab",
        to:"navya",
        msg:"Hi, Kothi !",
        created_at : new Date(),
    },
    {
        from:"abc",
        to:"xyz",
        msg:"Hi, xyz !",
        created_at : new Date(),
    },
    {
        from:"def",
        to:"uvw",
        msg:"Hi, uvw !",
        created_at : new Date(),
    },
    {
        from:"ghi",
        to:"rst",
        msg:"Hi, rst !",
        created_at : new Date(),
    },
];


Chat.insertMany(allChats);


// charts.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })