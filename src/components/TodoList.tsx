import React from "react";
import { Todo } from "../model";
import { SingleTodo } from "./SingleTodo";
import "./styles.css";
import { Droppable } from "react-beautiful-dnd";

// Here we are declaring the types of our props
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  CompletedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos,setTodos, CompletedTodos, setCompletedTodos }: Props) => {
  return (
    // container for our 2 lists
    <div className="container">
      {/* droppable zone of our active todos list, which takes the id of TodosList.. I will want to change this name to 'activeTodos' instead. */}
      <Droppable droppableId="TodosList">
        {/* provided gives us access to the object that contains props that you can spread onto your own components to make them draggable and droppable */}
        {/* snapshot gives us information of the current state of the drag, such as if an item is being dragged to a droppable area */}
        {/* function, which returns our div which is our active tasks list, passing in the provided and snapshot props */}
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            /* innerRef is a function that needs to be attached to the element that needs to be referenced, in this case its the div of our active tasks. By attaching provided.innerRef to the ref attribute of the container divs, we are essentially telling react-beautiful-dnd to attach its own internal ref to that same DOM node. This allows react-beautiful-dnd to control the positioning of the draggable elements and update it during the drag-and-drop process. */
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {/* here we map out todos array, which consits of our active todos. For each todo in the list we will return the single todo component, giving it the properties of that todo. We also give the index which is part of the map function. This helps us keep track of the todo item we are moving */}
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {/* In React Beautiful DnD, provided.placeholder is a React element that
            is used as a placeholder for the draggable item when it is being
            dragged. It is added to the DOM when the draggable item is being
            moved, and is removed when the item is dropped. */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={CompletedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
