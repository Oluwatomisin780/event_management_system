import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private primsaService: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    return this.primsaService.user.create({
      data: {
        ...createUserInput,
      },
    });
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOne(email: string) {
    return this.primsaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
