import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  email: string;
  @Field({ nullable: true })
  userType: UserType;
}
