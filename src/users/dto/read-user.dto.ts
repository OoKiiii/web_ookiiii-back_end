import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class ReadUserDto {
    email: string;
    password: string;
}
