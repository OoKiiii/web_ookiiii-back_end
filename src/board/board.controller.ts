import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './schemas/board.schema';

@Controller('/board')
export class BoardController {
    constructor(private readonly BoardService: BoardService) {}

    @Post('/create')
    async create(@Body() createBoardDto: CreateBoardDto) {
        console.log('controller', createBoardDto);
        await this.BoardService.create(createBoardDto);
    }

    @Get()
    async findAll(): Promise<Board[]> {
        return this.BoardService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Board> {
        return this.BoardService.findOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.BoardService.delete(id);
    }
}
