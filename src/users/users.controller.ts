import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        const { name, email, password } = createUserDto;
        await this.usersService.createUser(name, email, password);
    }

    @Post('/login')
    async login(@Body() loginUserDto: ReadUserDto): Promise<void> {
        const { email, password } = loginUserDto;

        await this.usersService.login(email, password);
    }

    // @Get()
    // findAll() {
    //     return this.usersService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     if (+id < 1) {
    //         throw new BadRequestException('id must be greater than 0');
    //     }
    //     return this.usersService.findOne(+id);
    // }

    // @Get('/:userId/posts/:postId')
    // findOne(@Param('userId') userId: string, @Param('postId') postId: string) {
    //     console.log(userId);
    //     return `userId: ${userId}, postId: ${postId}`;
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }
}
