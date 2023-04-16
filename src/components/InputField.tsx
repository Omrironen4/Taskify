import React, { useRef } from "react";
import "./styles.css";

// I created an interface here which helps assign types to the properties in this component. We do this because each component is its own, and typeScript requires that we declare types on every component, even though we declared them on App.tsx already.
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

// creating the InputField functional component
const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  // the inputRef is using the useRef hook from React, which returns an object with a 'current' property that is initialized to the argument passed to useRef. In this stage, the useRef is initialized to null. By giving the useRef a type of HTMLInputElement, we are telling TypeScript that the inputRef object is specifically a reference to an input element, and therefore, it should have access to all the properties and methods that are specific to input elements. For example, if we didn't specify the type of inputRef, TypeScript would assume it to be of type React.RefObject<HTMLElement>. In that case, we would not be able to use methods that are specific to input elements, such as .value, .focus(), .blur(), etc.
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        //when we submit the form, we blur away from the inputRef to move the focus off the input element, which removes the darker css background applied when it is focused.
        // Couldn't I have simply put inputRef.blur() instead of adding '.current?' ? No, you would not be able to call the blur() method directly on the inputRef object without accessing the current property first. This is because the inputRef object returned by the useRef hook is a container object that holds a reference to the actual input DOM node, and it is not the input DOM node itself.
        // To access the underlying input DOM node, we need to use the current property of the inputRef object, which returns the actual input DOM node that the useRef hook is referencing. Only then can we call the blur() method on the input DOM node to remove focus from the element.
        //The optional chaining operator (?.) ensures that if the inputRef.current is null or undefined (which can happen if the component has not yet rendered or if the input element is not available), the code will not throw a runtime error. Instead, the expression will short-circuit and return undefined, preventing the blur() method from being called on a non-existent object.
        inputRef.current?.blur();
      }}
    >
      <input
        //here we are assigning the reference of this input, to the inputRef so it has access to the input element properties.
        ref={inputRef}
        type="input"
        //The input field's value is equal to our 'todo' const which was defined in the App.tsx file. Since that const is equal to an empty string '', nothing is shown in the input text field, other than the placeholder becauset the placeholder is shown when the value of the input is an empty string. If you were to change the value of the const todo, you would see it displayed instead of the placeholder.
        value={todo}
        //The onChange will keep track of any changes that the user types in the input field and store those string values in the todo const, by setting the values through setTodo.
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a Task"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
