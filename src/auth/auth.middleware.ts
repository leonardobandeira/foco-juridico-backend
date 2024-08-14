import { Injectable, NestMiddleware } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private defaultApp: admin.app.App;

  constructor() {
    const firebaseConfig: { [key: string]: any } = {
      type: process.env.FIREBASE_TYPE!,
      project_id: process.env.FIREBASE_PROJECT_ID!,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID!,
      private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL!,
      client_id: process.env.FIREBASE_CLIENT_ID!,
      auth_uri: process.env.FIREBASE_AUTH_URI!,
      token_uri: process.env.FIREBASE_TOKEN_URI!,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL!,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL!,
    };

    this.defaultApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });

  }

  use(req: any, res: Response, next: () => void) {
    const token = req.headers.authorization;

    if (token != null && token !== '') {
      this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const user = {
            email: decodedToken.email,
          };

          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.log(error);
          this.accessDenied(req.url, res);
        });
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Acesso Negado!',
    });
  }
}
