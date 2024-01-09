import { InputType, Int, Field } from '@nestjs/graphql';
import { TicketType } from '@prisma/client';

@InputType()
export class CreateTicketInput {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  price: number;
  @Field()
  ticketType: TicketType;
}