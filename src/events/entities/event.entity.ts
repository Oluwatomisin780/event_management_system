import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  date: string;
  @Field()
  location: string;
}
