import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@sahunk/medium-common";
export const blogRouter = new Hono();
//middleware
blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            c.set('userId', user.id);
            await next();
        }
        else {
            c.status(403);
            return c.json({ message: "please login" });
        }
    }
    catch (error) {
        c.status(403);
        return c.json({ message: "please login" });
    }
});
//create blog
blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Incorrect inputs" });
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            //extract userId from middleware where you take the token from user and pass it to the authorId
            authorId: userId,
        }
    });
    return c.json({ id: blog.id });
});
//update blog
blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Incorrect inputs" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });
    return c.json({ id: blog.id });
});
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
    return c.json({ blogs });
});
//get blog
blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
        });
        return c.json({ blog });
    }
    catch (error) {
        c.status(411);
        return c.json({ error: 'blog not found' });
    }
});
