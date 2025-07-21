import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@sahunk/medium-common";

type JwtPayload ={
    id:string;
}

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId: string;
  }
}>();

//middleware
blogRouter.use('/*', async(c, next)=>{
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    console.log("Auth header:", authHeader);
  console.log("Extracted token:", token);
  console.log("jwt:", c.env.JWT_SECRET)
   try {
    const user = await verify(token, c.env.JWT_SECRET) as { id: string };

    if (!user?.id) {
      c.status(403);
      return c.json({ message: "Invalid token payload" });
    }

    c.set("userId", user.id);
    await next();
  } catch (error) {
    console.error("JWT verification error:", error);
    c.status(403);
    return c.json({ message: "Please login (invalid or expired token)" });
  }
    
})
//create blog
blogRouter.post("/", async(c) => {
    const body = await c.req.json();
    
      const parsed= createPostInput.safeParse(body)
      if(!parsed.success){
        console.log(parsed.error.format())
         c.status(411);
        return c.json({message:"Incorrect inputs"})
      }
    const userId = c.get("userId")
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog =await prisma.post.create({
    data:{
        title:body.title,
        content:body.content,
        //extract userId from middleware where you take the token from user and pass it to the authorId
        authorId: userId,
    }
  })

  return c.json({id: blog.id})
});

//update blog
blogRouter.put("/", async(c) => {
    const body = await c.req.json();
    
      const {success }= updatePostInput.safeParse(body)
      if(!success){
         c.status(411);
        return c.json({message:"Incorrect inputs"})
      }

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where:{
        id: body.id
    },
    data:{
        title:body.title,
        content: body.content,
    }
  })

  return c.json({id: blog.id})
});

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select:{
      title:true,
      content:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }
  })

  return c.json({blogs})
});

//get blog
blogRouter.get("/:id", async(c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
    where:{
        id: id
    },
    select:{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true
        }
      }
    }
   
  })

  return c.json({ blog})
  } catch (error) {
    c.status(411);
    return c.json({error:'blog not found'})
  }
});

