import ITodo from "../interfaces/ITodo";
function useDate() {
  const getDate = (todo: ITodo) => {
    const output: Date =
      new Date(todo.createdAt) === new Date(todo.updatedAt)
        ? new Date(todo.createdAt)
        : new Date(todo.updatedAt);
    const isCreated =
      todo.createdAt === todo.updatedAt ? "Created At" : "Updated At";
    const date =
      output.getDate() > 9
        ? output.getDate().toString()
        : `0${output.getDate()}`;
    const month =
      output.getMonth() + 1 > 9
        ? (output.getMonth() + 1).toString()
        : `0${output.getMonth() + 1}`;
    const year = output.getFullYear().toString();
    const time = `${
      output.getHours() > 9
        ? output.getHours().toString()
        : `0${output.getHours().toString()}`
    }:${
      output.getMinutes() > 9
        ? output.getMinutes().toString()
        : `0${output.getMinutes()}`
    }`;
    return `${isCreated} ${date}/${month}/${year} - ${time}`;
  };
  function getPreviousOrNextDate(checkDate: Date, payload: number): string {
    const date = new Date();
    date.setDate(checkDate.getDate() + payload);
    return date.toISOString().substring(0, 10);
  }
  return {
    getPreviousOrNextDate,
    getDate,
  };
}

export default useDate;
