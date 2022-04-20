import React from "react";
import T from 'prop-types';

import styles from "./Form.module.css";

const ALBUMS_URL = (param) => `https://itunes.apple.com/search?term=${param}`;

const getAlbums = async (param) => {
  try {
    const response = await fetch(ALBUMS_URL(param));

    return response.json();
  } catch {
    throw new Error("Api Error!");
  }
};

const Form = ({ setAlbums }) => {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const albums = await getAlbums(value);
    const sortedAlbums = albums.results
      .sort((a, b) => a.collectionName.localeCompare(b.collectionName))
      .splice(0, 5)
      .map((album) => {
        return album.collectionName;
      });

    setAlbums(sortedAlbums);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        className={styles.input}
        type="text"
        placeholder="Search Band"
        onChange={handleChange}
      />
    </form>
  );
};

Form.propTypes = {
  setAlbums: T.func
}

export default React.memo(Form);
