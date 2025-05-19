import z from "zod";

export const SignupTypes = z.object({
  name: z.string().min(3, "name is too short"),
  email: z.string().min(3, "email is too short"),
  password: z.string().min(3, "password is too short"),
});

export const SigninTypes = z.object({
  email: z.string().min(3, "email is too short"),
  password: z.string().min(3, "password is too short"),
});

export const CreateRoomTypes = z.object({
  name: z.string().min(3, "name is too short"),
  slug: z.string(),
});
