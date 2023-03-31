export default interface ITodo {
  _id: string;
  title: string;
  content: string;
  userId: string;
  complete: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
