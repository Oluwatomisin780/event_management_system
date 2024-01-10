import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'change_it_later', //change it to env later
      global: true,
      signOptions: { expiresIn: '60' },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
