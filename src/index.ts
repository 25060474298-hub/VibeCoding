import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "VibeCoding API",
          version: "1.0.0",
          description: "REST API built with Bun, ElysiaJS, Drizzle ORM, and MySQL",
        },
      },
    })
  )
  .onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        message: "Validation failed",
        errors: error.all ?? error.message,
      };
    }

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        success: false,
        message: "Resource or endpoint not found",
      };
    }

    set.status = 500;
    console.error("[ServerError]:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return {
      success: false,
      message: errorMessage,
    };
  })
  .get("/", () => ({
    success: true,
    message: "Welcome to VibeCoding API (Bun + Elysia + Drizzle + MySQL)",
    docs: "/swagger",
  }))
  .use(routes)
  .listen(port);

console.log(`🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`);
console.log(`📚 Swagger documentation available at http://${app.server?.hostname}:${app.server?.port}/swagger`);
