const fs = require("fs");

const http = require("http");

const url = require("url");

const readData = fs.readFileSync("./txt/start.txt", "utf-8");

const replaceTemplates = require("./modules/replaceTemplates");



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

const overview = fs.readFileSync("./templates/Overview.html", "utf-8");
const product = fs.readFileSync("./templates/product.html", "utf-8");
const card = fs.readFileSync("./templates/card.html", "utf-8");

// STep 1 : Server Create
const productData = fs.readFileSync("./dev-data/data.json", "utf-8");

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  console.log(query, pathname);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = JSON.parse(productData)
      .map((product) => replaceTemplates(card, product))
      .join("");
    const output = overview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const products = JSON.parse(productData)[query.id];
    const output = replaceTemplates(product, products);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });

    res.end(productData);
  } else {
    res.end("Url not found");
  }
});

// Step 2: Invoke the server or start the server
const PORT_NO = 9000;
server.listen(port, "0.0.0.0", () => {
  console.log("server Started on ", PORT_NO);
});
