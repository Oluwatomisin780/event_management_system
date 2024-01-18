import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import UserType from '../auth/enums/userRoles.enum';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

import { Roles } from '../auth/decorators/roles.decorators';
import { CurrentUser, JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { User } from '../users/entities/user.entity';
import { coerceInputValue } from 'graphql';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => Ticket)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserType.ORGANIZER)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
    @CurrentUser() user: User,
  ) {
    return this.ticketsService.create(createTicketInput, user.id);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserType.ORGANIZER)
  async updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
    @CurrentUser() user: User,
  ) {
    const userId = await this.ticketsService.getUserIdByTicket(
      updateTicketInput.id,
    );
    if (userId !== user.id) throw new UnauthorizedException();
    return this.ticketsService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation(() => Ticket)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserType.ORGANIZER)
  async removeTicket(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    const userId = await this.ticketsService.getUserIdByTicket(id);
    if (userId !== user.id) throw new UnauthorizedException();
    return this.ticketsService.remove(id);
  }
}
