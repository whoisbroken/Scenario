import React from "react";
import T from 'prop-types';

import styles from './List.module.css';

const List = ({ state }) => {
  return (
    <ul className={styles.list}>
      {state.map((letter, index) => {
        return (
          <li key={letter + index} className="li">
            {letter}
          </li>
        );
      })}
    </ul>
  );
};

List.propTypes = {
  state: T.arrayOf(T.string)
}

export default List;
