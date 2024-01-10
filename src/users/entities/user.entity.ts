import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  userType: UserType;
}
