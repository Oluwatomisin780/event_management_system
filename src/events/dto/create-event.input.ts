import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  location: string;
}
