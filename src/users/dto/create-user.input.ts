import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
  @Field()
  email: string;
  @Field()
  password?: string;
  @Field()
  name: string;
}
