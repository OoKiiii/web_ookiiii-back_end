import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board, BoardDocument } from './schemas/board.schema';

@Injectable()
export class BoardService {
    constructor(@InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>) {}

    async create(CreateBoardDto: CreateBoardDto): Promise<Board> {
        console.log('service', CreateBoardDto);
        const createdBoard = await this.boardModel.create(CreateBoardDto);
        return createdBoard;
    }

    async findAll(): Promise<Board[]> {
        return this.boardModel.find().exec();
    }

    async findOne(id: string): Promise<Board> {
        return this.boardModel.findOne({ _id: id }).exec();
    }

    async delete(id: string) {
        const deletedBoard = await this.boardModel.findByIdAndRemove({ _id: id }).exec();
        return deletedBoard;
    }
}
