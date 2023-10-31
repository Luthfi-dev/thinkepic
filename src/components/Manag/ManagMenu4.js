import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const initialItems = {
  parentOrder: ["parent-1", "parent-2", "parent-3"],
  items: {
    "parent-1": {
      label: "Parent 1",
      subItems: ["submenu-1-1", "submenu-1-2"],
    },
    "parent-2": {
      label: "Parent 2",
      subItems: ["submenu-2-1", "submenu-2-2"],
    },
    "parent-3": {
      label: "Parent 3",
      subItems: [],
    },
  },
};

const Menu = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedItems = { ...items };

    if (source.droppableId === destination.droppableId) {
      const parentId = source.droppableId;
      const parent = updatedItems.items[parentId];
      const [movedItem] = parent.subItems.splice(source.index, 1);
      parent.subItems.splice(destination.index, 0, movedItem);
    } else {
      const sourceParent = updatedItems.items[source.droppableId];
      const destParent = updatedItems.items[destination.droppableId];
      const [movedItem] = sourceParent.subItems.splice(source.index, 1);
      destParent.subItems.splice(destination.index, 0, movedItem);
    }

    setItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h1>Menu Management</h1>
        {items.parentOrder.map((parentId) => {
          const parent = items.items[parentId];
          return (
            <Droppable
              key={parentId}
              droppableId={parentId}
              type="parent"
              direction="vertical"
            >
              {(provided) => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  <li>
                    <button>{parent.label}</button>
                  </li>
                  {parent.subItems.map((subItemId, index) => {
                    const subItem = items.items[subItemId];
                    return (
                      <Draggable
                        key={subItemId}
                        draggableId={subItemId}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span>☰</span> {/* Handle */}
                            {subItem && subItem.label}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                </ul>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default Menu;
