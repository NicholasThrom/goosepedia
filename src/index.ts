import * as http from "http";

const port = parseInt(process.env.PORT || "3456", 10);

const server = http.createServer((req, res) => {
    res.end("hello, world!");
});

server.listen(port);
server.on("listening", () => {
    console.log(`Listening on port ${port}.`);
});
