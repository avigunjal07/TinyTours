import express from "express";
const server=express();
const PORT=8020;
server.listen(PORT,()=>{
    console.log(`server is running on the port:${PORT}`)
})
server.get("/hi",(req,res)=>{
    res.send("Hello World")
    

})