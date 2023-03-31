export default interface ITodo {
  _id: string;
  title: string;
  content: string;
  userId: string;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
}
