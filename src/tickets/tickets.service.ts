import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prismaService: PrismaService) {}
  //check if user is oauthorize later

  create(createTicketInput: CreateTicketInput, userId: number) {
    return this.prismaService.ticket.create({
      data: {
        ...createTicketInput,
        organizer_id: userId,
      },
    });
  }

  findAll() {
    return this.prismaService.ticket.findMany();
  }

  async findOne(id: number) {
    const ticket = await this.prismaService.ticket.findUnique({
      where: {
        id,
      },
    });
    if (!ticket) throw new NotFoundException('ticket does not exist');
    return ticket;
  }
  async update(id: number, updateTicketInput: UpdateTicketInput) {
    const ticket = await this.findOne(id);
    if (!ticket) throw new NotFoundException('ticket does not exist');
    //check organizer id later hare

    return this.prismaService.ticket.update({
      where: {
        id,
      },
      data: {
        ...updateTicketInput,
      },
    });
  }
  async remove(id: number) {
    const ticket = await this.findOne(id);
    if (!ticket) throw new NotFoundException('ticket does not exist');
    //check organizer id later hare
    return this.prismaService.ticket.delete({
      where: { id },
    });
  }
  //get userIdbyticket

  async getUserIdByTicket(id: number) {
    const ticket = await this.prismaService.ticket.findUnique({
      where: {
        id,
      },
      select: {
        organizer_id: true,
      },
    });
    return ticket.organizer_id;
  }
}
