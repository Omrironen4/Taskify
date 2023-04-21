import React from "react";
import { Todo } from "../model";
import { SingleTodo } from "./SingleTodo";
import "./styles.css";

// Here we are making the types of our props
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// we are making our list of todo items, in which we are mapping the todos array of objects.

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="container">
      {/*   notice what is happening here: we are taking the todos array, which
      holds our todo model objects as each array item. Each object will
      represent the Todo model as we know. So now for each item in the array,
      which is the entire Todo object, we will create a component called
      'SingleTodo'. So if our array has 3 todo items in there, or basically 3
      objects with the interface of Todo, then we will create 3 SingleTodo
      components. This SingleTodo component will take the following data as
      props: the signle iterrated todo object from the mapping, the todo.id
      which will represent the key of the single iterrated todo object, the
      todos which represent the todos array that we are initially mapping, and
      we are also passing the setTodos hook, to be able to setTodos in the
      component of a sinleTodo when we edit, mark as done, or delete.  */}
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        {todos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>
        {todos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
