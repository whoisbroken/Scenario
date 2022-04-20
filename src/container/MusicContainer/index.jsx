import React from "react";

import styles from "./MusicContainer.module.css";

import { LETTERS } from "../../constants/letters";
import Form from "../../components/Form";
import List from "../../components/List";

const MusicContainer = () => {
  const [list, setList] = React.useState(LETTERS);
  const [albums, setAlbums] = React.useState([]);

  const rotate = React.useCallback(() => {
    const tempList = [...list];
    const tempAlbums = [...albums];

    const firstElement = tempAlbums.shift() || tempList[0];
    tempList.shift();
    tempList.push(firstElement);

    setList(tempList)
    setAlbums(tempAlbums);
  }, [albums]);

  const tick = React.useCallback(() => {
    rotate();
  }, [rotate]);

  React.useEffect(() => {
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [tick]);

  return (
    <main className={styles.block}>
      <Form setList={setList} setAlbums={setAlbums} />
      <List list={list} />
    </main>
  );
};

export default MusicContainer;
