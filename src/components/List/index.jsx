import React from "react";
import T from 'prop-types';

import styles from './List.module.css';

const List = ({ list }) => {
  return (
    <ul className={styles.list}>
      {list.map((item, index) => {
        return (
          <li key={item + index} className="li">
            {item}
          </li>
        );
      })}
    </ul>
  );
};

List.propTypes = {
  list: T.arrayOf(T.string)
}

export default List;
