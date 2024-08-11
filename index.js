const express = require("express");
const app = express(); 
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then((res)=>{
    console.log("Connected to MongoDB");  // Connection established successfully
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1= new Chat({
//     from:"nayab",
//     to:"navya",
//     msg:"Hi, Kothi !",
//     //created_at : new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })



app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    // console.log(chats);
    // res.send("working");
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        date: Date.now(),
    });
    newChat.save().then((res)=>{
        console.log("chat saved");
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});

app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg: newMsg}=req.body;
    // console.log(newMsg);
    let updatedChat= await Chat.findByIdAndUpdate(
        id, 
        {msg:newMsg},
        {
            new:true,
            // runValidators:true,
        }  
    );
    // console.log(updatedChat);
    res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("root is working");
});

// app.get("/chats/:id/edit",(req,res)=>{
//     let {id}=req.params;
//     Chat.findById(id).then((res)=>{
//         res.render("edit.ejs",{chat});
//     }).catch((err)=>{
//     res.render("edit.ejs");
//     });
// });



app.listen (8080,()=>{
    console.log("Server is running on port 8080");
});