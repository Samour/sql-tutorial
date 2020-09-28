import { Request, Response, RequestHandler } from 'express';

type AsyncRequestHandler = (req?: Request, res?: Response) => Promise<any>;

export function routeBridge(handler: AsyncRequestHandler): RequestHandler {
  return (req, res, err) => handler(req, res).then((data) => res.send(data)).catch(err);
}
