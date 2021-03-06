//ITEMS
export type TypeMembers = Array<string>;

export type TypeSubTask = {
    subtaskId: string;
    completed: boolean;
    description: string;
};
export type TypeResponsible = {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    cpf: string;
    image: {
        imageId: number;
        path: string;
        extension: string;
        name: string;
        size: number;
    } | null;
};

export type TypeItem = Object<
    string,
    {
        taskId: string;
        title: string;
        description: string;
        tag: {
            tagId: number;
            companyId: number;
            label: string;
            color: string;
        } | null;
        responsible: Array<TypeResponsible>;
        subtasks: [
            {
                completed: boolean;
                description: string;
            }
        ];
        // tasks: Array<{
        //     id: string;
        //     checked: boolean;
        //     title: string;
        // }>;
    }
>;

//COLUMNS

export type TypeColumn = Object<
    string,
    {
        id: string;
        title: string;
        itemsIds: Array<string>;
    }
>;

export type TypeBoard = {
    items: Object<
        string,
        {
            taskId: string;
            title: string;
            description: string;
            tag: {
                tagId: number;
                companyId: number;
                label: string;
                color: string;
            } | null;
            responsible: Array<string>;
            subtasks: [
                {
                    completed: boolean;
                    description: string;
                }
            ];
            // tasks: Array<{
            //     id: string;
            //     checked: boolean;
            //     title: string;
            // }>;
        }
    >;
    columns: Object<
        string,
        {
            id: string;
            title: string;
            itemsIds: Array<string>;
        }
    >;
    columnsOrder: Array<string>;
};
export type TypeNewBoard = Array<{
    sessionId: number;
    position: number;
    title: string;
    description: string;
    tasks: Array<{
        taskId: number;
        title: string;
        description: string;
        tag: {
            tagId: number;
            companyId: number;
            label: string;
            color: string;
        } | null;
        subtasks: [
            {
                completed: boolean;
                description: string;
            }
        ];
        responsible: Array<string> | null;
    }> | null;
}>;

export type TaskSocket = {
    completed: boolean;
    cost: number;
    description: string;
    finalDate: date;
    heads: null;
    initialDate: date;
    nodes: null;
    progress: boolean;
    session: number;
    sessionId: number;
    subtasks: null;
    tag: string;
    tagId: number;
    taskId: number;
    taskUsers: null;
    title: string;
};
