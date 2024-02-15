 import express from "express"
 import mysql from "mysql"
 import cors from "cors"

 const app=express()

 const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Majorproject4*",
    database:"bookreviews"
 })

 //AUTHENTICATION PROBLEM SO WE USE THE FOLLOWING CODE IN CMD PROMPT

 //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Majorproject4*';

 app.use(express.json())
 app.use(cors())

 app.get("/", (req,res)=>{
    res.json("hello this is the backend")
 })

 app.get("/books", (req,res)=>{
    const q ="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
 })

 app.post("/books",(req,res)=>{
    const q="INSERT INTO books (`title`,`review`,`rating`,`image`,`genre`) VALUES (?)";
    const values= [
        req.body.title,
        req.body.review,
        req.body.rating,
        req.body.image,
        req.body.genre
        
        ];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfullly");

    });
 });

 //DELETE

 app.delete("/books/:id", (req,res)=>{
    const bookId=req.params.id;
    const q= "DELETE FROM books WHERE id=?";

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfullly");
    });
 });

 //UPDATE

 app.put("/books/:id", (req,res)=>{
    const bookId=req.params.id;
    const q= "UPDATE books SET `title`=?, `review`=?, `rating`=?, `image`, `genre'=? WHERE id=?";

    const values=[
        req.body.title,
        req.body.review,
        req.body.rating,
        req.body.image,
        req.body.genre

    ];

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfullly");
    });
 });


 app.listen(500, ()=>{
    console.log("Connected to backend!")
 })