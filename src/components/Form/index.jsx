import React from "react";
import T from "prop-types";

import styles from "./Form.module.css";

import { ALBUMS_URL } from "../../constants/urls";
import { LETTERS } from "../../constants/letters";

const getAlbums = async (param) => {
  try {
    const response = await fetch(ALBUMS_URL(param));

    return response.json();
  } catch {
    throw new Error("Api Error!");
  }
};

const Form = ({ setList, setAlbums }) => {
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
      .map((album) => album.collectionName);

    setList(LETTERS);
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
  setAlbums: T.func,
};

export default React.memo(Form);
