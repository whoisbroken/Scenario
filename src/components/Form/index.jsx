import React from "react";
import T from "prop-types";

import styles from "./Form.module.css";

import { LETTERS } from "../../constants/letters";
import { getAlbums } from '../../utils/requests';

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
  setList: T.func,
  setAlbums: T.func
};

export default React.memo(Form);
