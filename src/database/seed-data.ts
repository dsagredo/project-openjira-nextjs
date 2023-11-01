interface seedDataT {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: seedDataT = {
    entries: [
        {
            description:
                'Pending: Labore dolore consectetur do ipsum id proident id.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description:
                'In Progress: Sunt ullamco duis elit velit excepteur excepteur sit incididunt eiusmod in ipsum ullamco deserunt.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description:
                'Finished: Aliqua dolore minim adipisicing minim pariatur exercitation adipisicing.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ],
};
