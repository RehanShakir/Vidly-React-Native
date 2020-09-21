import React from "react";
const List = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItems,
  } = props;
  return (
    <ul className="list-group clickable">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItems
              ? "list-group-item active"
              : "list-group-item"
          }
          key={item[valueProperty]} //Value Property = _id
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
List.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default List;
