const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    fs.readFile("html/form.html", "utf-8", (error, data) => {
        if (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error");
            return;
        }

        if (req.url == "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);  // use res.end here
        } else if (req.url == "/submit") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Form Submitted Successfully</h1>"); // use res.end here too
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Page not found");
        }
    });
}).listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
