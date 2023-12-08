const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
const jsobj = require("./jsobj");

function readingFile() {
  return new Promise((res, rej) => {
    fs.readFile("./sample.html", "utf-8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}

let server = http.createServer((req, res) => {
  //GET /html - Should return the following HTML content.
  // Note when opened in the browser it should display the HTML page and not the HTML code.
  if (req.url === "/html" && req.method === "GET") {
    readingFile().then((data) => {
      res.writeHeader(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
  //GET /json - Should return the following JSON string
  if (req.url === "/json" && req.method === "GET") {
    res.write(JSON.stringify(jsobj));
    res.end();
  }
  //GET /uuid - Should return a UUID4. For example:
  if (req.url === "/uuid" && req.method === "GET") {
    let uuid = crypto.randomUUID();
    res.write(JSON.stringify({ uuis: uuid }));
    res.end();
  }
  let arr = [100, 200, 300, 400, 500];
  /**GET /status/{status_code} - Should return a response with a status code as specified in the request. For example:

        /status/100 - Return a response with 100 status code
        /status/500 - Return a response with 500 status code */
  arr.forEach((element) => {
    if (req.url === `/status/${element}` && req.method === "GET") {
      res.writeHead(element);
      //res.write();
      res.end(JSON.stringify(res.statusCode));
    }
  });
  /**GET /delay/{delay_in_seconds} - Should return a success response but after the specified delay in the request.
   *  For example: If the request sent is GET /delay/3,
   * then the server should wait for 3 seconds and only then send a response with 200 status code. */
  if (req.url.includes("delay") && req.method === "GET") {
    res.writeHead(200);
    let arr = req.url.split("/");
    //console.log(arr);
    let times = Number(arr[arr.length - 1]);
    //console.log(times);
    //console.log(typeof times);
    if (typeof times === "number") {
      let sam = new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, times * 1000);
      });
      sam.then(() => {
        res.write(JSON.stringify(res.statusCode));
        res.end();
      });
    }
    //res.end()
  }
});

server.listen(8000);
