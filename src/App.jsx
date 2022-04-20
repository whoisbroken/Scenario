import React from "react";
import styles from "./App.module.css";

const LETTERS = ["A", "B", "C", "D", "E"];
const ALBUMS_URL = (param) => `https://itunes.apple.com/search?term=${param}`;

const getAlbums = async (param) => {
  try {
    const albums = await fetch(ALBUMS_URL(param));
    if (!albums.ok) {
      return await (await fetch(ALBUMS_URL(param))).json();
    }
    return albums.json();
  } catch {
    throw new Error("Api Error!");
  }
};

const App = () => {
  const [state, setState] = React.useState(LETTERS);
  const [albums, setAlbums] = React.useState([]);
  const [value, setValue] = React.useState("");

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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const albums = await getAlbums(value);
    const sortedAlbums = albums.results.sort((a, b) =>
      a.collectionName.localeCompare(b.collectionName)
    ).splice(0, 5).map((album) => {
      return album.collectionName
    });

    setAlbums(sortedAlbums);
  };

  return (
    <main className="App">
      <div className={styles.block}>
        <form onSubmit={handleSubmit}>
          <input
            value={value}
            className={styles.input}
            type="text"
            placeholder="Search Band"
            onChange={handleChange}
          />
        </form>
        <ul className={styles.list}>
          {state.map((letter, index) => {
            return (
              <li key={letter + index} className="li">
                {letter}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default App;
