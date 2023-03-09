import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList/TodoList';
import ShoppingCart from './ShoppingCart/ShoppingCart';

function App() {
  return (
    <div className="App">
      <h2>Lista de tareas:</h2>
      <TodoList></TodoList>
      <h2>Carrito de la compra:</h2>
      <ShoppingCart></ShoppingCart>
    </div>
  );
}

export default App;
