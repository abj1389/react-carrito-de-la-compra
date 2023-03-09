import React from "react";

const initialValue = {
    items: [{
      id: 0,
      name: "Chocolate",
      price: 2
    }],
    lastItem: 0,
};

const reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "ADD ITEM":
      const newItem = {
        id: state.lastItem + 1,
        name: action.payload.name,
        price: action.payload.price
      };
      newState.items = [...newState.items, newItem];
      newState.lastItem = newItem.id;

      break;

    case "DELETE ITEM":
      newState.items = newState.items.filter(item => item.id !== action.payload.id);
      break;

    default:
      console.error("ACTION TYPE NOT SUPPORTED");
  }

  return newState;
};

const calcSum = (state) => {
  const sum = state.items.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price), 0);
  return sum;
};

const ShoppingCart = () => {

  const [state, dispatch] = React.useReducer(reducer, initialValue);
  const sumMemo = React.useMemo(() => calcSum(state),[state]);

  const nameRef = React.useRef(null);
  const priceRef = React.useRef(null);

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    const payloadToSend = {
      name: nameRef.current.value,
      price: priceRef.current.value
    };
    dispatch({ type: "ADD ITEM", payload: payloadToSend });

    nameRef.current.value = "";
    priceRef.current.value = "";
  }, []);

  const deleteItem = React.useCallback((itemId) => {
    const payloadToSend = {
      id: itemId,
    };

    dispatch({ type: "DELETE ITEM", payload: payloadToSend });
  }, []);


  return (
    <div className="shopping-cart">

      <form onSubmit={onSubmit}>
        <input ref={nameRef} type="text" />
        <input ref={priceRef} type="text" />
        <button type="submit">Añadir producto</button>
      </form>

      <h4>Productos:</h4>

      <ul>
        {state.items.map((item) =>
          <li key={item.id}>
            {item.name} / Precio: {item.price}€ <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </li>
        )}
      </ul>
      <h3>Total: {sumMemo}€</h3>
    </div>
  );
}

export default ShoppingCart;