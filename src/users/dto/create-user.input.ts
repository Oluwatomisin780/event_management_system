import { InputType, Int, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  role: Role;
}

@InputType()
export class LoginUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
