import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    status: boolean;
    message: string | string[];
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { message = 'Bad requet' } = req.query;
    res.status(400).json({ status: false, message });
}
