const http = require("http");
const fs = require("fs");
const querystring=require('querystring')

http
  .createServer((req, res) => {
    fs.readFile("html/form.html", "utf-8", (error, data) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
        return;
      }

      if (req.url == "/") {
        res.write(data);
        // use res.end here
      } else if (req.url == "/submit") {
        let dataBody = [];
        req.on("data", (chunks) => {
          dataBody.push(chunks);
        });
        req.on('end',()=>{
            let rawData=Buffer.concat(dataBody).toString();
            let readableData=querystring.parse(rawData)
            console.log("FormData:",readableData);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`<h1>Thanks ${readableData.name}! We got your email: ${readableData.email}</h1>`)
        })
        
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
      }
    });
  })
  .listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });
