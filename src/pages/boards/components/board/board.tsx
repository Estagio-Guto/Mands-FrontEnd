import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useStyles from './styles';

// Import data for board
import { initialBoardData } from '../../data/board-initial-data';

// Import BoardColumn component
import { BoardColumn } from '../column/board-column';

const Board: React.FC = () => {
    const classes = useStyles();
    // Initialize board state with board data
    const [state, setState] = useState(initialBoardData);

    // Handle drag & drop
    const onDragEnd = (result: any) => {
        const { source, destination, draggableId, type } = result;
        console.log('STATE');
        console.log(state);
        // Do nothing if item is dropped outside the list
        if (!destination) {
            return;
        }

        // Do nothing if the item is dropped into the same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(state.columnsOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...state,
                columnsOrder: newColumnOrder,
            };
            setState(newState);
            return;
        }

        // Find column from which the item was dragged from
        const columnStart = (state.columns as any)[source.droppableId];

        // Find column in which the item was dropped
        const columnFinish = (state.columns as any)[destination.droppableId];

        // Moving items in the same list
        if (columnStart === columnFinish) {
            // Get all item ids in currently active list
            const newItemsIds = Array.from(columnStart.itemsIds);

            // Remove the id of dragged item from its original position
            newItemsIds.splice(source.index, 1);

            // Insert the id of dragged item to the new position
            newItemsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for columns
            const newColumnStart = {
                ...columnStart,
                itemsIds: newItemsIds,
            };

            // Create new board state with updated data for columns
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumnStart.id]: newColumnStart,
                },
            };

            // Update the board state with new data
            setState(newState);
        } else {
            // Moving items from one list to another
            // Get all item ids in source list
            const newStartItemsIds = Array.from(columnStart.itemsIds);

            // Remove the id of dragged item from its original position
            newStartItemsIds.splice(source.index, 1);

            // Create new, updated, object with data for source column
            const newColumnStart = {
                ...columnStart,
                itemsIds: newStartItemsIds,
            };

            // Get all item ids in destination list
            const newFinishItemsIds = Array.from(columnFinish.itemsIds);

            // Insert the id of dragged item to the new position in destination list
            newFinishItemsIds.splice(destination.index, 0, draggableId);

            // Create new, updated, object with data for destination column
            const newColumnFinish = {
                ...columnFinish,
                itemsIds: newFinishItemsIds,
            };

            // Create new board state with updated data for both, source and destination columns
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumnStart.id]: newColumnStart,
                    [newColumnFinish.id]: newColumnFinish,
                },
            };

            // Update the board state with new data
            setState(newState);
        }
    };

    const AddColumn = () => {
        const newState = {
            ...state,
            columns: {
                ...state.columns,
                'column-4': {
                    id: 'column-4',
                    title: 'Nova Coluna',
                    itemsIds: [],
                },
            },
            columnsOrder: [...state.columnsOrder, 'column-4'],
        };
        setState(newState);
    };

    const setTitle = (
        title: string,
        columnID: 'column-1' | 'column-2' | 'column-3'
    ) => {
        // console.log(columnID);
        const newState = { ...state };
        newState.columns[columnID].title = title;

        setState(newState);
    };

    return (
        <>
            <button type="button" onClick={AddColumn}>
                Add new group
            </button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {provided => (
                        <div
                            className={classes.boardElements}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* Get all columns in the order specified in 'board-initial-data.ts' */}
                            {state.columnsOrder.map((columnId, index) => {
                                // Get id of the current column
                                const column = (state.columns as any)[columnId];

                                // Get item belonging to the current column
                                const items = column.itemsIds.map(
                                    (itemId: string) =>
                                        (state.items as any)[itemId]
                                );

                                // Render the BoardColumn component
                                return (
                                    <BoardColumn
                                        key={column.id}
                                        column={column}
                                        items={items}
                                        index={index}
                                        setTitle={setTitle}
                                    />
                                );
                            })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};
export default Board;