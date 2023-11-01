import moongose, { Model, Schema } from 'mongoose';
import { Entry } from '@/interfaces';

export interface IEntry extends Entry {}

const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number },
    status: {
        type: String,
        message: '{VALUE} no es un estado permitido',
        enum: { values: ['pending', 'in-progress', 'finished'] },
        default: 'pending',
    },
});

const EntryModel: Model<IEntry> =
    moongose.models.Entry || moongose.model('Entry', entrySchema);

export default EntryModel;
