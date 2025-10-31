import { Response } from "express";

let clients: Response[] = [];

// Register a new SSE connection
export const registerClient = (res: Response) => {
  clients.push(res);

  res.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
};

// Send progress update to all connected clients
export const sendProgress = (progress: number) => {
  const data = JSON.stringify({ progress });
  clients.forEach((res) => res.write(`data: ${data}\n\n`));
};

// Notify clients that upload is complete
export const sendDone = () => {
  clients.forEach((res) => res.write(`data: done\n\n`));
  clients.forEach((res) => res.end());
  clients = [];
};

//res.write() -> Sends a piece of data but keeps the connection open
//here we do res.setHeader("Content-Type", "text/event-stream");
//res.end() -> Sends the final data and closes the connection
//clients => List of all active SSE connections (Response objects)
//registerClient(res) -> Adds a new connected client
//res.on("close") => Removes the client when they disconnect


//res.json() -> Sends one complete message and closes connection immediately 
// here we do res.setHeader("Content-Type", "application/json");