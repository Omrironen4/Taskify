import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

// type definition of our SingleTodo props that we gave it in TodoList.tsx
type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
};

export const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // handleDone will fire everytime we click the check icon (the MdDone icon).
  // this will update the todos array, with a new array that is mapped.
  // The newly mapped array will either update the isDone property by inversing the boolean, or it will keep the todo as is.
  // We are modifying a single todo item within the todos array, which is a very minor change.
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        //logic explained: in the todos array, is there a todo item with an id that equals the current id of this singleTodo? The current id of this single todo is already existing from when it was created. The id of this single todo is being passed as a property of the handleDone function, which comes from the onClick, which comes from the todo prop of the SigleTodo component as a whole.. which then has access to the id.
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // handleDelete will be calle when we click the delete icon, and here we will set the todos array through filtering the array, and we wil return all the todos which don't have the id of the currently clicked todo.
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // the handleEdit will be fired every time we submit the form element / input field in the single todo component. This will return all the previous todos that don't match the current id of the todo we are editing, and also update the current todo that we are editing because it will match with an id. Then we setEdit back to false, because when we initially click on the edit icon it inverses the edit value to true.
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  //here we are making a reference to the input element of this component
  const inputRef = useRef<HTMLInputElement>(null);
  //here we are using the useEffect hook solely for the purpose of focusing in on the input element when we click the edit button. The useEffect takes 2 arguments, one which we have as the input reference, and the other is the array of dependencies, which put the edit boolean in. So anytime we click the edit icon, the edit boolean inverses causing the useEffect side effect to run, where we then execute the focus().
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
         >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                //the idea behind this logic, is that if out todo edit mode is off, and if our todo is not done, then we will set the edit to true.. given that it is initially false. So we update the state of edit, making it now a truthy boolean.
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
    // we are returning a form with either an input, a string in an <s> tag, or a string in a span tag.
    // Then we display 3 icons next to it.
  );
};
