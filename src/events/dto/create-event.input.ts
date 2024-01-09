import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
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
