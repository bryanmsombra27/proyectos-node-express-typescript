import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const res = await request(server).post("/api/products").send({});

    expect(res.status).toBe(400);
    expect(res.status).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(4);
    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(2);
  });

  it("should validate the price greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "monitor curvo",
      price: 0,
    });

    expect(res.body.price).toBeGreaterThan(0);
    expect(res.status).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.status).toBe(400);
  });
  it("should validate the price is a number and   greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "monitor curvo",
      price: "hola",
    });

    expect(res.body.price).toBeNaN();
    expect(res.status).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(2);
    expect(res.status).toBe(400);
  });

  it("should create a new product", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Mouse electronico TESTING",
      price: 200,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.status).not.toBe(200);
    expect(res.status).not.toBe(400);
    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("errors");
  });
});

describe("GET  /api/products", () => {
  it("should check if api/products url exists", async () => {
    const res = await request(server).get("/api/products");

    expect(res.status).not.toBe(400);
  });

  it("get a JSON response with products", async () => {
    const res = await request(server).get("/api/products");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("products");
    expect(res.body).toHaveProperty("count");
    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(500);
    expect(res.body).not.toHaveProperty("errors");
  });
});
describe("GET  /api/products/:id", () => {
  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const res = await request(server).get(`/api/products/${productId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
