import { Request, Response, NextFunction } from "express";
import { registerClient } from "../utils/sse";

export default function progress(req : Request, res: Response) {

   if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "https://trans-yobe.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "https://trans-yobe.vercel.app");

  registerClient(res);
}