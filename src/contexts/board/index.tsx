import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';
import { useParams } from 'react-router-dom';

import { projectApi, TypeProjectPermModel } from '../../services';
import {
    // initialBoardData3 as BoardData,
    newBoardData,
} from '../../utils/data/board';
// import { v4 as uuidv4 } from 'uuid';
import { connectHub, HubConnection } from '../../services/socket';
import useAuth from '../../hooks/useAuth';
import { ConvertResponse } from './Functions/convertResponse';
import snackbarUtils from '../../utils/functions/snackbarUtils';
import TypeParams from '../../models/params';
import {
    TypeBoard,
    TypeColumn,
    TypeItem,
    TaskSocket,
    // TypeNewBoard,
} from '../../models/boardTypes';

interface BoardContextData {
    state: TypeBoard;
    setState: Dispatch<SetStateAction<TypeBoard>>;
    permissions: TypeProjectPermModel;
    setPermissions: Dispatch<SetStateAction<TypeProjectPermModel>>;
    loading: boolean;
    AddTask: (columnID: keyof TypeColumn, task: TaskSocket) => void;
    UpdateTask: (itemID: keyof TypeItem, updatedItem: TypeItem) => void;
    DeleteTask: (itemID: keyof TypeItem, columnID: keyof TypeColumn) => void;
    AddColumn: (columnID: string, position: number) => void;
    DeleteColumn: (columnID: keyof TypeColumn) => void;
    setColumnTitle: (title: string, columnID: keyof TypeColumn) => void;
    setTaskFields: (
        title: string,
        taskId: keyof TypeItem,
        field: string
    ) => void;
}

const BoardContext = createContext<BoardContextData>({} as BoardContextData);
//Funções de Task

// import { Container } from './styles';
export const BoardProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<TypeBoard>(
        ConvertResponse(newBoardData)
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [permissions, setPermissions] = useState<TypeProjectPermModel>({
        name: 'Nome da permissão',
        editProject: false,
        deleteProject: false,
        session: false,
        task: false,
        taskResponsible: false,
        createTemplate: false,
    });
    const { user } = useAuth();
    const params = useParams<TypeParams>();

    const [hubConnection, setHubConnection] = useState<
        HubConnection | undefined
    >(undefined);

    //Funções de Coluna
    const AddColumn = (columnId: string, position: number) => {
        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [columnId]: {
                    sessionId: columnId,
                    position: position,
                    title: 'Título da nova coluna',
                    itemsIds: [],
                },
            },
            columnsOrder: [...state.columnsOrder, columnId],
        };

        setState(newState);
    };

    const DeleteColumn = (columnID: keyof TypeColumn) => {
        const newState = {
            ...state,
        };
        //Apagar todos os itens pertencentes a coluna excluída
        (newState.columns[columnID].itemsIds as Array<any>).map(
            (itemID: 1 | 2) => {
                delete newState.items[itemID];
                return itemID;
            }
        );
        //Apaga a coluna propriamente dita
        delete newState.columns[columnID];
        // Retira do array de ordem das colunas o ID da coluna apagada
        newState.columnsOrder = newState.columnsOrder.filter(
            e => e !== columnID
        );

        setState(newState);
    };

    const setColumnTitle = (title: string, columnID: keyof TypeColumn) => {
        const newState = { ...state };
        newState.columns[columnID].title = title;

        setState(newState);
    };

    const setTaskFields = (
        title: string,
        taskId: keyof TypeItem,
        field: string
    ) => {
        const newState = { ...state };
        newState.items[taskId][field] = title;

        setState(newState);
    };

    //Funções de Task
    const DeleteTask = (itemID: keyof TypeItem, columnID: keyof TypeColumn) => {
        // console.log(itemID);
        // console.log(columnID);
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        delete newState.items[itemID];
        newState.columns[columnID].itemsIds = newState.columns[
            columnID
        ].itemsIds.filter((item: string) => item !== itemID);
        setState(newState);
    };
    const AddTask = (columnID: keyof TypeColumn, task: TaskSocket) => {
        // console.log(task);
        const newID = 'task_' + task.taskId.toString();
        // const newID = Math.floor(Math.random() * 100001).toString();
        // console.log(state);
        const newState = {
            ...state,
        };
        // console.log(newState);
        //Adicionar Item à lista de itens
        newState.items = {
            ...state.items,
            [newID]: {
                taskId: newID,
                title: task.title,
            },
        };
        // console.log(newState.items);
        //Adicionar ID do item à coluna correspondente
        // console.log(columnID);
        newState.columns[columnID].itemsIds = [
            ...newState.columns[columnID].itemsIds,
            newID,
        ];
        // console.log('newState');
        setState(newState);
    };
    const UpdateTask = (itemID: keyof TypeItem, updatedItem: TypeItem) => {
        const newState = {
            ...state,
        };
        //Adicionar Item à lista de itens
        newState.items[itemID] = updatedItem;

        setState(newState);
    };
    useEffect(() => {
        console.log(state);
    }, [state]);

    useEffect(() => {
        const handleHubConnection = async () => {
            try {
                if (user) {
                    const hubResponse = await connectHub(user.userId);
                    setHubConnection(hubResponse);
                }
            } catch (error) {
                console.log(error);
            }

            return () => {
                hubConnection?.stop();
            };
        };
        handleHubConnection();
        // eslint-disable-next-line
    }, [user]);
    const channels = [
        'TaskSent',
        'TaskUpdated',
        'TaskDeleted',
        'TaskUpdatePosition',
        'ResponsibleAssociated',
        'ResponsibleDeleted',
        'SessionChanged',
        'SubtaskCreated',
        'SubtaskUpdated',
        'SubtaskDeleted',
        'SessionCreated',
        'SessionUpdated',
        'SessionDeleted',
        'SessionPosUpdated',
        'SubTaskUpdatePosition',
    ];
    useEffect(() => {
        const handleWebSocket = async () => {
            if (hubConnection) {
                try {
                    console.log(params.project);
                    hubConnection.invoke('JoinGroup', params.project!);
                    channels.forEach(channel => {
                        hubConnection.on(channel, response => {
                            console.log(response);
                            setState(ConvertResponse(response));
                        });
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        };
        handleWebSocket();
        // console.log(params);
        // eslint-disable-next-line
    }, [hubConnection]);

    useEffect(() => {
        const getBoardData = async () => {
            try {
                const response = await projectApi.getBoardData(
                    parseInt(params.project!)
                );
                console.log(response.data);
                setState(ConvertResponse(response.data));
                setLoading(false);
            } catch (error) {
                snackbarUtils.error(error.message);
            }
        };
        getBoardData();
        // console.log('object');
        // eslint-disable-next-line
    }, []);

    return (
        <BoardContext.Provider
            value={{
                state,
                setState,
                loading,
                AddTask,
                UpdateTask,
                DeleteTask,
                AddColumn,
                DeleteColumn,
                setColumnTitle,
                setTaskFields,
                permissions,
                setPermissions,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export default BoardContext;
