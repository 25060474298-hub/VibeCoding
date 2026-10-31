import { Elysia, t } from "elysia";
import { UserService } from "../services/user.service";

export const userRoutes = new Elysia({ prefix: "/api/users" })
  .get(
    "/",
    async () => {
      const users = await UserService.getAll();
      return {
        success: true,
        data: users,
      };
    },
    {
      detail: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Retrieve a list of all registered users",
      },
    }
  )
  .get(
    "/:id",
    async ({ params: { id }, set }) => {
      const user = await UserService.getById(id);
      if (!user) {
        set.status = 404;
        return {
          success: false,
          message: `User with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: user,
      };
    },
    {
      params: t.Object({
        id: t.Numeric({ description: "User ID" }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Get user by ID",
        description: "Retrieve single user details by user ID",
      },
    }
  )
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const user = await UserService.create(body);
        set.status = 201;
        return {
          success: true,
          message: "User created successfully",
          data: user,
        };
      } catch (error: any) {
        if (error?.code === "ER_DUP_ENTRY") {
          set.status = 409;
          return {
            success: false,
            message: "User with this email already exists",
          };
        }
        throw error;
      }
    },
    {
      body: t.Object({
        name: t.String({
          minLength: 1,
          maxLength: 255,
          description: "Full name of the user",
        }),
        email: t.String({
          format: "email",
          description: "Unique email address of the user",
        }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Create user",
        description: "Register a new user with name and email",
      },
    }
  )
  .put(
    "/:id",
    async ({ params: { id }, body, set }) => {
      try {
        const updatedUser = await UserService.update(id, body);
        if (!updatedUser) {
          set.status = 404;
          return {
            success: false,
            message: `User with id ${id} not found`,
          };
        }
        return {
          success: true,
          message: "User updated successfully",
          data: updatedUser,
        };
      } catch (error: any) {
        if (error?.code === "ER_DUP_ENTRY") {
          set.status = 409;
          return {
            success: false,
            message: "User with this email already exists",
          };
        }
        throw error;
      }
    },
    {
      params: t.Object({
        id: t.Numeric({ description: "User ID" }),
      }),
      body: t.Object({
        name: t.Optional(
          t.String({
            minLength: 1,
            maxLength: 255,
            description: "Full name of the user",
          })
        ),
        email: t.Optional(
          t.String({
            format: "email",
            description: "Unique email address of the user",
          })
        ),
      }),
      detail: {
        tags: ["Users"],
        summary: "Update user",
        description: "Update details of an existing user",
      },
    }
  )
  .delete(
    "/:id",
    async ({ params: { id }, set }) => {
      const deleted = await UserService.delete(id);
      if (!deleted) {
        set.status = 404;
        return {
          success: false,
          message: `User with id ${id} not found`,
        };
      }
      return {
        success: true,
        message: "User deleted successfully",
      };
    },
    {
      params: t.Object({
        id: t.Numeric({ description: "User ID" }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Delete user",
        description: "Delete an existing user by ID",
      },
    }
  );
