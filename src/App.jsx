import React from "react";
import styles from "./App.module.css";

import Form from "./components/Form";
import List from "./components/List";

const LETTERS = ["A", "B", "C", "D", "E"];

const App = () => {
  const [state, setState] = React.useState(LETTERS);
  const [albums, setAlbums] = React.useState([]);

  const tick = React.useCallback(() => {
    const tempState = [...state];
    const tempAlbums = [...albums];

    if (albums.length) {
      tempState.shift();
      const firstElement = tempAlbums.shift();
      tempState.push(firstElement);

      setState(tempState);
      setAlbums(tempAlbums);
    } else {
      const firstElement = tempState.shift();
      tempState.push(firstElement);

      setState(tempState);
    }
  }, [state, albums]);

  React.useEffect(() => {
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [tick]);

  return (
    <main className="App">
      <div className={styles.block}>
        <Form setAlbums={setAlbums} />
        <List state={state} />
      </div>
    </main>
  );
};

export default App;
