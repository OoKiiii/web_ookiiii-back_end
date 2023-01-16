import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    writer: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
