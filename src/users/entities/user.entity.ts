import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  email: string;
  @Field({ nullable: true })
  role: Role;
}
