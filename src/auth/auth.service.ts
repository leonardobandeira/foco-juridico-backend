import { Injectable, UnauthorizedException } from '@nestjs/common';
import { admin } from './config'; 

@Injectable()
export class AuthService {
  async validateToken(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken; 
    } catch (error) {
      throw new UnauthorizedException('Token inválido, usuário não autorizado.');
    }
  }
}
