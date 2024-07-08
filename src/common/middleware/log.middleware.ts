import { NextFunction, Request, Response } from 'express';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LogMiddleware.name);

  private logRequest(req: Request) {
    const { method, url, body, headers } = req;
    this.logger.log(`Incoming Request: ${method} ${url}`);
    this.logger.debug(`Headers: ${JSON.stringify(headers)}`);
    this.logger.debug(`Body: ${JSON.stringify(body)}`);
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logRequest(req);
    next();
  }
}
