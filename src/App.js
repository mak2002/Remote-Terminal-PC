import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
// const { exec } = require("child_process");
// const exec  = require('child_process').exec;
import Axios from 'axios'


function App() {
  const [todos, settodos] = useState([]);
  const todosCollectionRef = collection(db, "todos");
  const [todo, settodo] = useState();
  const [clicked, setclicked] = useState(false);

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const makeTodo = async () => {
    await addDoc(todosCollectionRef, { todo: todo });
  };

  const handleClick = (e) => {
    setclicked(!clicked);
    Axios.get('http://localhost:5000/test').then((response) => {console.log('success', response)})
    // makeTodo();
    // gettodos();
  };

  const gettodos = async () => {
    const data = await getDocs(todosCollectionRef);
    console.log("data: ", data);
    settodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    gettodos();
  }, []);

  return (
    <div className="App">
      <input type="text" placeholder="Todos..." onChange={handleChange} />
      <button onClick={handleClick}>Add Todo</button>
      {todos.map((todo) => {
        return <h1 key={todo.id}>{todo.todo}</h1>;
      })}
    </div>
  );
}

export default App;
