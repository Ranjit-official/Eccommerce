import { ROLES,GENDER, STATUS } from "src/common/constants/constants";
import * as zod from "zod";

export const userSchema = zod.object({
    name : zod.string().min(3,{message : "Name must be at least 3 characters"}).max(255,{message : "Name must be less than 255 characters"}),
    email : zod.string().email({message : "Invalid email address"}).max(255),
    password : zod.string().min(8,{message : "Password must be at least 8 characters"}).max(255,{message : "Password must be less than 255 characters"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message : "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    }),
})
export const registerDTO = zod.object({
    name : zod.string().min(3,{message : "Name must be at least 3 characters"}).max(255,{message : "Name must be less than 255 characters"}),
    email : zod.string().email({message : "Invalid email address"}).max(255),
    password : zod.string().min(8,{message : "Password must be at least 8 characters"}).max(255,{message : "Password must be less than 255 characters"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message : "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
    }),
    confirmPassword : zod.string().min(8,{message : "Password must be at least 8 characters"}).max(255,{message : "Password must be less than 255 characters"}),
    phone: zod.string().min(10).max(15).optional().nullable().default(null),
    address : zod.object({
        billingAddress : zod.string().min(3).max(255).optional().nullable().default(null),
        shippingAddress : zod.string().min(3).max(255).optional().nullable().default(null),
    }),
    role :  zod.enum([ROLES.ADMIN, ROLES.CUSTOMER, ROLES.SELLER],{message : "Invalid role"}).optional().nullable().default(ROLES.CUSTOMER),
    gender : zod.enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER],{message : "Invalid gender"}).optional().nullable().default(GENDER.MALE),
    dob : zod.date().optional().nullable().default(null),
    image : zod.string().optional().nullable().default(null),
    status : zod.enum([STATUS.ACTIVE, STATUS.INACTIVE],{message : "Invalid status"}).optional().nullable().default(STATUS.INACTIVE),
    activationToken : zod.string().min(10).max(100) .optional().nullable().default(null),
}).refine((data) => data.password === data.confirmPassword, {
    message : "Passwords do not match",
    path : ["confirmPassword"],
})

export type RegisterDTO = zod.infer<typeof registerDTO>;

export const loginDTO = zod.object({
    email: userSchema.shape.email,
    password: userSchema.shape.password,
})

export type LoginDTO = zod.infer<typeof loginDTO>;