import React from "react";
import { FcTodoList } from "react-icons/fc";

function NoTodos() {
  return (
    <h1 style={{ fontSize: "3rem" }} className="font-weight-bold text-center">
      <FcTodoList />
      No Todos found
    </h1>
  );
}

export default NoTodos;
