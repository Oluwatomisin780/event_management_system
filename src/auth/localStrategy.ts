import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  // 校验用户名和密码是否正确的方法
  async validate(email: string, password: string) {
    const user = await this.authService.validate(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
