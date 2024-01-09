import { CreateEventInput } from './create-event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field()
  name?: string;
  @Field()
  description?: string;
  @Field()
  date?: string;
  @Field()
  location?: string;
}
