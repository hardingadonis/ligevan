import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
	private readonly logger = new Logger(MorganMiddleware.name);

	use(req: Request, res: Response, next: NextFunction) {
		morgan('dev', {
			stream: {
				write: (message) => this.logger.log(message),
			},
		})(req, res, next);
	}
}
