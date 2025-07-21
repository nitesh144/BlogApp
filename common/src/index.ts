import z from "zod";

export const signupInput = z.object({
    email: z.string().email({message:"enter a valid email"}),
    password: z.string().min(6,{message:"password must be 6 character"}),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string()
});

export type UpdatePostType = z.infer<typeof updatePostInput>;