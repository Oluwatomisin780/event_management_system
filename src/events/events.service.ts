import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { PrismaService } from '../prisma/prisma.service';
import e from 'express';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/guards/jwt-auth.guard';
@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}
  create(createEventInput: CreateEventInput, user_id: number) {
    return this.prismaService.event.create({
      data: {
        ...createEventInput,
        organizer_id: user_id,
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: number) {
    return this.prismaService.event.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEventInput: UpdateEventInput) {
    const eventExist = await this.findOne(id);
    if (!eventExist) throw new NotFoundException('event does not exist');
    // check  if user id are the same later
    return this.prismaService.event.update({
      where: {
        id,
      },
      data: {
        ...updateEventInput,
      },
    });
  }

  async remove(id: number) {
    const eventExist = await this.prismaService.event.findUnique({
      where: { id },
    });
    if (!eventExist) throw new NotFoundException('event not does not exist');

    // check user id Later here

    return this.prismaService.event.delete({
      where: {
        id,
      },
    });
  }

  //get userId In event
  async getUserIdByEvent(id: number) {
    const userId = await this.prismaService.event.findUnique({
      where: {
        id,
      },
      select: {
        organizer_id: true,
      },
    });
    return userId.organizer_id;
  }
}
