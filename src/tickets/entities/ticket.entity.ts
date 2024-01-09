import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TicketType } from '@prisma/client';

@ObjectType()
export class Ticket {
  @Field(() => Int)
  price?: number;
  @Field()
  ticketType?: TicketType;
}
