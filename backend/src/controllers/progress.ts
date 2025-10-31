import { Request, Response, NextFunction } from "express";
import { registerClient } from "../utils/sse";

export default function progress(req : Request, res: Response) {

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  registerClient(res);
}