import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ulid } from 'ulid';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

    async createUser(name: string, email: string, password: string) {
        const userEmailCheck = await this.checkUserExists(email);
        if (userEmailCheck) {
            throw new UnprocessableEntityException('해당이메일로 가입한 내역이 있습니다.');
        }

        const signupVerifyToken = uuid.v1();

        await this.saveUser(name, email, password, signupVerifyToken);
    }

    private async checkUserExists(email: string): Promise<boolean> {
        const user = await this.usersRepository.findOne({ where: { email } });

        return user !== undefined;
    }

    private async saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
        const user = new UserEntity();
        user.id = ulid();
        user.name = name;
        user.email = email;
        user.password = password;
        user.signupVerifyToken = signupVerifyToken;
        await this.usersRepository.save(user);
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (user && user.password !== password) {
            throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
        }
    }

    // private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    //     await this.emailService.sendMemberJoinVerfication(email, signupVerifyToken);
    // }
}
