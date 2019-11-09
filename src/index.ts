import * as http from "http";
import fetch from "node-fetch";
import { modifyText } from "./text-modifier";

const baseURL = "https://wikipedia.org";

const port = parseInt(process.env.PORT || "3456", 10);

let hitCount = 0;

const server = http.createServer(async (req, res) => {
    console.log(`Hit ${++hitCount}`);
    const realPage = await fetch(baseURL + (req.url || ""));
    const realPageText = await realPage.text();
    res.end(modifyText(realPageText));
});

server.listen(port);
server.on("listening", () => {
    console.log(`Listening on port ${port}.`);
});
