import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller에 test를 넣으면 최종적으로 /test/hello에 접근해야함
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/hello')
    getHello(): string {
        return this.appService.getHello();
    }
}
