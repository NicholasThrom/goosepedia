import * as http from "http";
import fetch from "node-fetch";
import { modifyText } from "./text-modifier";

const baseURL = "https://en.wikipedia.org";

const port = parseInt(process.env.PORT || "3456", 10);

let hitCount = 0;

const server = http.createServer(async (req, res) => {
    console.log(`Hit ${++hitCount}`);
    const realPage = await fetch(baseURL + (req.url || ""));
    const realPageText = await realPage.text();
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
        res.end(modifyText(realPageText));
    } else {
        res.end(realPageText);
    }
});

server.listen(port);
server.on("listening", () => {
    console.log(`Listening on port ${port}.`);
});
