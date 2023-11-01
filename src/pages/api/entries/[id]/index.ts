import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import mongoose from 'mongoose';

type Data = { message: string } | IEntry;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es válido ' + id });
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);

        case 'GET':
            return getEntryId(req, res);

        case 'DELETE':
            return deleteEntry(req, res);

        default:
            return res
                .status(400)
                .json({ message: 'Método no existe ' + req.method });
    }
}

const getEntryId = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryInDB = await Entry.findById(id);
    await db.disconnect();

    if (!entryInDB) {
        return res
            .status(400)
            .send({ message: 'No hay entrada con ese ID' + id });
    }
    return res.status(200).json(entryInDB);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
    const entryUpdate = await Entry.findById(id);

    if (!entryUpdate) {
        await db.disconnect();
        return res
            .status(400)
            .send({ message: 'No hay entrada con ese ID' + id });
    }

    const {
        description = entryUpdate.description,
        status = entryUpdate.status,
    } = req.body;

    try {
        const updateEntry = await Entry.findByIdAndUpdate(
            id,
            {
                description,
                status,
            },
            { runValidators: true, new: true }
        );
        await db.disconnect();
        res.status(200).json(updateEntry!);
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json(error.errors.status.message);
    }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const entryDelete = await Entry.findByIdAndDelete(id);
    await db.disconnect();
    if (!entryDelete) {
        return res
            .status(400)
            .json({ message: 'No hay entrada con ese ID ' + id });
    }

    return res.status(200).json(entryDelete);
};
