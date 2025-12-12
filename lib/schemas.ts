import { z } from "zod"

export const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  curriculum: z.string().min(1, "Please select a curriculum"),
  grade: z.string().min(1, "Please select a grade"),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export interface Lead extends LeadFormData {
  id: string
  status: "Enquired" | "Attempted" | "Demo Assign" | "Demo Complete" | "Invoice Send" | "Enroll"
  createdAt: string
}

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

export type AdminLoginData = z.infer<typeof adminLoginSchema>

export interface AdminUser {
  id: string
  username: string
  password: string
}
