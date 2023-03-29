import ITodo from "../interfaces/ITodo";

const getDate = (todo: ITodo) => {
  const output: Date =
    new Date(todo.createdAt) === new Date(todo.updatedAt)
      ? new Date(todo.createdAt)
      : new Date(todo.updatedAt);
  const isCreated =
    todo.createdAt === todo.updatedAt ? "Created At" : "Updated At";
  const date =
    output.getDate() > 9 ? output.getDate().toString() : `0${output.getDate()}`;
  const month =
    output.getMonth() + 1 > 9
      ? (output.getMonth() + 1).toString()
      : `0${output.getMonth() + 1}`;
  const year = output.getFullYear().toString();
  const time = `${
    output.getHours() > 10
      ? output.getHours().toString()
      : `0${output.getHours().toString()}`
  }:${
    output.getMinutes() > 10
      ? output.getMinutes().toString()
      : `0${output.getMinutes()}`
  }`;
  return `${isCreated} ${date}/${month}/${year} - ${time}`;
};

export default getDate;
