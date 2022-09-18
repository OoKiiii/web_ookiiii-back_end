import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateUserDto {
    @Transform(params => params.value.trim())
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(60)
    readonly email: string;

    @Transform(({ value, obj }) => {
        if (obj.password.includes(obj.name)) {
            throw new BadRequestException('비밀번호에는 이름과 같은 문자열을 포함할 수 없습니다.');
        }
        return value.trim();
    })
    @IsString()
    @Matches(/^[A-Za-z0-9!@#$%^&*()_+]{8,30}$/)
    readonly password: string;
}
