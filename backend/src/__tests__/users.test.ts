import supertest from "supertest";
import app from "../app";
export const userPayLoad: { email: string; password: string } = {
  email: "test@test.com",
  password: "12345678",
};
const expectedUserPayLoad: { email: string; name: string; _id: string } = {
  _id: "6421e662154cdeec5391ed0b",
  name: "Test",
  email: "test@test.com",
};
describe("users", () => {
  describe("/api/v1/users", () => {
    describe("given the user did not login", () => {
      it("should return a 401", async () => {
        const { statusCode } = await supertest(app).get("/api/v1/users");
        expect(statusCode).toBe(401);
      });
    });
    describe("given the user has logged in", () => {
      it("should return a 200", async () => {
        const { headers } = await supertest(app)
          .post("/api/v1/users/login")
          .send(userPayLoad);
        const cookies = headers["set-cookie"];
        const { statusCode, body } = await supertest(app)
          .get("/api/v1/users")
          .set("Cookie", cookies);
        expect(statusCode).toBe(200);
        expect(body).toMatchObject(expectedUserPayLoad);
      });
    });
  });
  describe("/api/v1/users/login", () => {
    describe("given user has email and password", () => {
      it("should return a 200", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/login")
          .send(userPayLoad);
        expect(statusCode).toBe(200);
      });
    });
    describe("given user does not have email", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/login")
          .send({ password: "12345678" });
        expect(statusCode).toBe(404);
      });
    });
    describe("given user does not have password", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/login")
          .send({ email: "test@test.com" });
        expect(statusCode).toBe(404);
      });
    });
    describe("given user has wrong email", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/login")
          .send({ ...userPayLoad, email: "test" });
        expect(statusCode).toBe(404);
      });
    });
    describe("given user has wrong password", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/login")
          .send({ ...userPayLoad, password: "test" });
        expect(statusCode).toBe(404);
      });
    });
  });
  describe("/api/v1/register", () => {
    describe("given the user does not have password", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/register")
          .send({ email: "test@test.com", name: "Atul Dubey" });
        expect(statusCode).toBe(404);
      });
    });
    describe("given the user does not have email", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/register")
          .send({ name: "Atul Dubey", password: "12125645646" });
        expect(statusCode).toBe(404);
      });
    });
    describe("given the user does not have name", () => {
      it("should return a 404", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/register")
          .send({ password: "12125645646", email: "test@test.com" });
        expect(statusCode).toBe(404);
      });
    });
    describe("given the user has entered invalid email", () => {
      it("should return a 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/users/register")
          .send({
            password: "12125645646",
            email: "tes",
            name: "Atul Dubey",
          });
        expect(statusCode).toBe(400);
      });
    });
  });
});
