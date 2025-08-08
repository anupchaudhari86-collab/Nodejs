const fs = require("fs");

const http = require("http");

const url = require("url");

const readData = fs.readFileSync("./txt/start.txt", "utf-8");

// console.log(readData);

// //const final = fs.readFileSync("./txt/final.txt", "utf-8");

// //console.log(final);

// fs.writeFileSync(`./txt/${readData}.txt`, "Hello Anup");

// fs.readFile(`./txt/final.txt`,"utf-8",(err,data) => {
//     if(err) return console.log("Error In the Code !");
//     console.log(data);
// });

// fs.writeFile(`./txt/new.txt`,"We have created the new content for new file","utf-8", (err) => {
//     if(err) return console.log("Error In the Write Code !");
//     console.log("Data Written Successfully !");
// });

// fs.readFile(`./txt/start.txt`, "utf-8", (err,data) => {
//     if(err) return console.log("Error In the Read Code !");
//     console.log(data);

//     fs.writeFile(`./txt/${readData}.txt`,"Written from the Read File Over Here !","utf-8", (err) => {
//     if(err) return console.log("Error In the Write Code !");
//     console.log("Data Written Successfully !");
//     });

// });

// Server 

const server = http.createServer((req,res) => {
    const {query, pathname} = url.parse(req.url,true);
    console.log(query, pathname);

    if(pathname == "/about") {
        res.end(readData);
    } else {
       res.end("MY SERVER CREATED, HELLO WORLD !");
    }
    
});

server.listen(9000, "127.0.0.1", () => {
    console.log("Server Started !");
});