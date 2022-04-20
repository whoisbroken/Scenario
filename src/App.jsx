import React from "react";
import styles from "./App.module.css";

import Form from "./components/Form";
import List from "./components/List";

const LETTERS = ["A", "B", "C", "D", "E"];

const App = () => {
  const [list, setList] = React.useState(LETTERS);
  const [albums, setAlbums] = React.useState([]);

  const tick = React.useCallback(() => {
    const tempList = [...list];
    const tempAlbums = [...albums];

    if (albums.length) {
      tempList.shift();
      const firstElement = tempAlbums.shift();
      tempList.push(firstElement);

      setList(tempList);
      setAlbums(tempAlbums);
    } else {
      const firstElement = tempList.shift();
      tempList.push(firstElement);

      setList(tempList);
    }
  }, [list, albums]);

  React.useEffect(() => {
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [tick]);

  return (
    <main className="App">
      <div className={styles.block}>
        <Form setAlbums={setAlbums} />
        <List list={list} />
      </div>
    </main>
  );
};

export default App;
