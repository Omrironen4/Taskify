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
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // The handleAdd function, gets called from the InputField component. The InputField returns a html form element, which on submit, calls this handleAdd function. In the InputField component of the form element, we are making the value of the input equal to the todo const, which is defined above in in our useState hook. That way, every time a user types inside the input field, that value gets captured in our todo constant, or shall I say our useState todo const.
  // Now in the handleAdd function, we are preventing the reload defaut, and saying if there is a truthy todo, that is not an empty string basically, then we set the todos array with the previous todos array that is being spread PLUS a new object which will represent our new todo.. that has the current date as the id, the todo value from our useState hook which is essentially what the user typed in the input, and we then set that new todo's isDone property to false.
  const handleAdd = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (todo) {
      // so here we are adding
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
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
