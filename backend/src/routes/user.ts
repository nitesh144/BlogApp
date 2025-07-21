import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@sahunk/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const parsed = signupInput.safeParse(body);
  if (!parsed.success) {
    console.log(parsed.error.format());
    c.status(411);
    return c.json({ message: "Incorrect inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    console.log("User: ", user);
    return c.json({ jwt: token });
  } catch (error) {
    c.status(411);
    return c.json({ error: "Invalid" });
  }
});

//signin
userRouter.post("/signin", async (c) => {
  // const body = await c.req.json();
  // console.log("Inside /signin route", body);
  // console.log("Request headers:", c.req.header());
  // console.log("Parsed body:", body);

  // const result = signinInput.safeParse(body);
  // console.log("zod result", result);
  // const { success } = result;
  // if (!success) {
  //   c.status(411);
  //   return c.json({ message: "Incorrect inputs" });
  // }
   const contentType = c.req.header("Content-Type");
  console.log("Content-Type:", contentType); // Should be application/json

  const body = await c.req.json();
  console.log("Parsed body:", body); // Should show username & password

  const result = signinInput.safeParse(body);
  console.log("Zod result:", result);
  if (!body.username || !body.password) {
  console.log("Missing username or password in request body:", body);
}


  if (!result.success) {
    console.log("Zod errors:", result.error.format());
    c.status(411);
    return c.json({ message: "Incorrect inputs" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.username,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "Incorrect credentials" });
    }
    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Invalid" });
  }
});
