import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { CurrentUser, JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorators';
import UserType from '../auth/enums/userRoles.enum';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ORGANIZER)
  createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.create(createEventInput, user.id);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => Event, { name: 'event' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ORGANIZER)
  @Mutation(() => Event)
  async updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
    @CurrentUser() user: User,
  ) {
    const userid = await this.eventsService.getUserIdByEvent(
      updateEventInput.id,
    );
    if (userid !== user.id)
      throw new UnauthorizedException('User not Authorize');
    return this.eventsService.update(updateEventInput.id, updateEventInput);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ORGANIZER)
  @Mutation(() => Event)
  async removeEvent(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ) {
    const userid = await this.eventsService.getUserIdByEvent(id);
    if (userid !== user.id)
      throw new UnauthorizedException('User not Authorize');
    return this.eventsService.remove(id);
  }
}
