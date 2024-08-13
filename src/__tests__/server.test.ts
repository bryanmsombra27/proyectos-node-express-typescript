import request from "supertest";
import server from "../server";

describe("route testing GET /api", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("desde api");

    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe("desde API");
  });
});
