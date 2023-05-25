import supertest from "supertest";
import app from "../app";
describe("Server Health", () => {
  describe("get server health route /api/v1/health", () => {
    describe("Given the server is Running", () => {
      it("Should return a 200", async () => {
        const { statusCode } = await supertest(app).get("/api/v1/health");
        expect(statusCode).toBe(200);
      });
    });
  });
});
