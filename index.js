require("dotenv").config();

const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(process.env.USER_ID);
});

const content = "some content!";

fs.writeFile("./test.txt", content, (err) => {
  if (err) {
    console.log(err);
  }
});

const data = JSON.stringify({
  todo: "Buy the milk",
});

const options = {
  hostname: "whatever.com",
  port: 443,
  path: "/todos",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
