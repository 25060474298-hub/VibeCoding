import { describe, expect, it } from "bun:test";
import { app } from "../src/index";

describe("Elysia App Integration Tests", () => {
  it("GET / should return 200 and API info", async () => {
    const response = await app.handle(new Request("http://localhost/"));
    expect(response.status).toBe(200);

    const body = (await response.json()) as { success: boolean; docs: string };
    expect(body.success).toBe(true);
    expect(body.docs).toBe("/swagger");
  });

  it("GET /swagger/json should return OpenAPI schema", async () => {
    const response = await app.handle(new Request("http://localhost/swagger/json"));
    expect(response.status).toBe(200);

    const schema = (await response.json()) as {
      openapi?: string;
      swagger?: string;
      info: { title: string };
    };
    expect(schema.openapi || schema.swagger).toBeDefined();
    expect(schema.info.title).toBe("VibeCoding API");
  });

  it("GET /unknown-route should return 404 not found", async () => {
    const response = await app.handle(new Request("http://localhost/unknown-route"));
    expect(response.status).toBe(404);

    const body = (await response.json()) as { success: boolean };
    expect(body.success).toBe(false);
  });

  it("POST /api/users should fail with 400 when payload is invalid", async () => {
    const response = await app.handle(
      new Request("http://localhost/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email: "not-an-email" }),
      })
    );
    expect(response.status).toBe(400);

    const body = (await response.json()) as {
      success: boolean;
      message: string;
      errors: unknown;
    };
    expect(body.success).toBe(false);
    expect(body.message).toBe("Validation failed");
    expect(body.errors).toBeDefined();
  });
});
