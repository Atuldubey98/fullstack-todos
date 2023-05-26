import supertest from "supertest";
import app from "../app";
import { userPayLoad } from "./users.test";
const cookies: string[] = [];
let userId: string = "";
let todoId: string = "";
const todoPayLoad: { title: string; content: string } = {
  title: "This is title",
  content: "This is content",
};
describe("todos", () => {
  describe("GET : /api/v1/todos", () => {
    describe("given the user did not login", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app).get("/api/v1/todos");
        expect(statusCode).toBe(401);
      });
    });
    describe("given the user has logged in", () => {
      it("should return 200", async () => {
        const { headers, body } = await supertest(app)
          .post("/api/v1/users/login")
          .send(userPayLoad);
        userId = body._id;
        const cookie = headers["set-cookie"];
        cookies.push(...cookie);
        const { statusCode } = await supertest(app)
          .get("/api/v1/todos")
          .set("Cookie", cookies);
        expect(statusCode).toBe(200);
      });
    });
  });
  describe("POST : /api/v1/todos", () => {
    describe("given the user didn't login", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/todos")
          .send(todoPayLoad);
        expect(statusCode).toBe(401);
      });
    });
    describe("given the user has logged in", () => {
      it("should return 201", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/v1/todos")
          .set("Cookie", cookies)
          .send(todoPayLoad);
        expect(statusCode).toBe(201);
        todoId = body._id;
        expect(body).toHaveProperty("title", todoPayLoad.title);
        expect(body).toHaveProperty("content", todoPayLoad.content);
        expect(body).toHaveProperty("userId", userId);
      });
    });
    describe("given the todo does not have title", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/todos")
          .set("Cookie", cookies)
          .send({ content: "This is content" });
        expect(statusCode).toBe(400);
      });
    });
    describe("given the todo does not have body", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/todos")
          .set("Cookie", cookies)
          .send({});
        expect(statusCode).toBe(400);
      });
    });
  });
  describe("UPDATE : /api/v1/todos/:id", () => {
    describe("given the user didn't login", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app)
          .put(`/api/v1/todos/${todoId}`)
          .send(todoPayLoad);
        expect(statusCode).toBe(401);
      });
    });
    describe("given the user has logged in", () => {
      it("should return 200", async () => {
        const putTodoPayload = { title: "This is new title" };
        const { statusCode, body } = await supertest(app)
          .put(`/api/v1/todos/${todoId}`)
          .set("Cookie", cookies)
          .send(putTodoPayload);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("title", putTodoPayload.title);
      });
    });
    describe("given the todo update title payload is wrong", () => {
      it("should return 200", async () => {
        const putTodoPayload = { title: "Th" };
        const { statusCode } = await supertest(app)
          .put(`/api/v1/todos/${todoId}`)
          .set("Cookie", cookies)
          .send(putTodoPayload);
        expect(statusCode).toBe(400);
      });
    });
  });
  describe("DELETE : /api/v1/todos/:id", () => {
    describe("given the user didn't login", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app)
          .delete(`/api/v1/todos/${todoId}`)
          .send(todoPayLoad);
        expect(statusCode).toBe(401);
      });
    });
    describe("given the user has logged in", () => {
      it("should return 204", async () => {
        const { statusCode } = await supertest(app)
          .delete(`/api/v1/todos/${todoId}`)
          .set("Cookie", cookies);
        expect(statusCode).toBe(204);
      });
    });
    describe("given the user did not pass todoId", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .delete(`/api/v1/todos`)
          .set("Cookie", cookies);
        expect(statusCode).toBe(404);
      });
    });
    describe("given the user has passed incorrect todoId", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .delete(`/api/v1/todos/haskd`)
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
  });
});
