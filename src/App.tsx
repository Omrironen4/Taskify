import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  // setting todo equal to an empty string and showing the type of string.
  const [todo, setTodo] = useState<string>("");
  // We use an alias Todo[] in setTodos, which is a custom interface in TypeScript. This interface creates a new object type with specified properties and types, defined in the model.ts file. In TypeScript, the syntax Todo[] with square brackets indicates an 'array of Todo objects'. So Todo[] means an array of objects that conform to the Todo interface on model.ts. When you pass an empty array ([]) as the initial state value to the useState hook, TypeScript infers that the type of the state variable is an empty array of type Todo[]. So the array expects objects with the keys defined in model.ts.
  const [todos, setTodos] = useState<Todo[]>([]);

  // The completed todos is an array with the same imterface as the todos array above.
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // The handleAdd function, gets called from the InputField component. The InputField returns a html form element, which on submit, calls this handleAdd function. In the InputField component of the form element, we are setting the todo state to the string using the onChange function. That way, every time a user types inside the input field, that value gets captured in our todo constant, or shall I say our useState todo const.
  // Now in the handleAdd function, we are preventing the reload defaut, and saying if there is a truthy todo, that is not an empty string basically, then we set the todos array with the previous todos array that is being spread PLUS a new object which will represent our new todo.. that has the current date as the id, the todo value from our useState hook which is essentially what the user typed in the input, and we then set that new todo's isDone property to false.
  const handleAdd = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (todo) {
      // so here we are adding
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  // onDragEnd is a function which tells us what to do when we finish dragging a todo.
  // The result parameter, when we console log it, provides us with information such as the destination, source, and index of where it came from in the list of todos. Plus more.
  const onDragEnd = (result: DropResult) => {
    console.log(result);
    // destructuring the source and destination out of the result.
    const { source, destination } = result;

    // if destination does not exist, such that we did not drop the todo anywhere, then we return.
    if (!destination) {
      return;
    }
    // if the source and destination match with an id and an index, then we return.. because we are simply placing a todo back to where it was exactly.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // defining variables that are out of scope..
    // in this section we decide to which array we will add the todo that is being dragged.
    let add;
    let active = todos;
    let complete = completedTodos;

    // if the todo is coming from the acive zone,

    if (source.droppableId === "TodosList") {
      // we save the index of our todo in the active list before removing it, so we remember it's place in the list.
      add = active[source.index];
      // we are taking out the todo from the active todos list, by its index.
      active.splice(source.index, 1);
    } else {
      // if the id is not from the completed list,
      // we save the index of our todo in the completed list before removing it, so we remember it's place in the list.
      add = complete[source.index];
      // we are taking out the todo from the completed todos list, by its index.
      complete.splice(source.index, 1);
    }

    // if the todo is going to the active zone
    if (destination.droppableId === "TodosList") {
      // we will add it in the active todos array, in the specific destination it is dropped by index.
      active.splice(destination.index, 0, add);
    } else {
      // otherwise if it's going to the completed zone, we will add it in the completed todos array, in the specific destination it is dropped by index.
      complete.splice(destination.index, 0, add);
    }

    // now we set both of our arrays with its correct data.
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    // we wrap our application with the DragnDrop, passing it the onDragEnd functionality.
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        {/* the input field component lets us type a new todo, and place it within the active task array(the todos array).  */}
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
