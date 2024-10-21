import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Perfil')
@Controller('usuario')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('profile')
    @ApiOperation({ summary: 'Retorna os dados do usuário logado' })
    async getUserProfile(@Headers('Authorization') authorization: string) {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token não encontrado.');
        }

        const idToken = authorization.split(' ')[1];
        const user = await this.authService.validateToken(idToken);

        return {
            uid: user.uid,
            email: user.email,
            nome: user.name,
            picture: user.picture
        };
    }
}

