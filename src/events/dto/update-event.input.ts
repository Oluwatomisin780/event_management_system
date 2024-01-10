import { CreateEventInput } from './create-event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id?: number;
  @Field()
  name?: string;
  @Field()
  description?: string;

  @Field()
  location?: string;
}
