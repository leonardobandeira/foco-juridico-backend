// src/auth/auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { admin } from './config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
      admin.auth().verifyIdToken(token.replace('Bearer ', ''))
        .then((decodedToken) => {
          req['user'] = {
            email: decodedToken.email,
          };
          next();
        })
        .catch(() => {
          res.status(403).json({
            statusCode: 403,
            message: 'Acesso Negado!',
          });
        });
    } else {
      res.status(401).json({
        statusCode: 401,
        message: 'Token não fornecido!',
      });
    }
  }
}
