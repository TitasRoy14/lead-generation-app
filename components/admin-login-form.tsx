"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminLoginSchema } from "@/lib/schemas"
import { validateAdminCredentials, setAdminSession, initializeStorage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ZodError } from "zod"

export default function AdminLoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const data = adminLoginSchema.parse({ username, password })
      initializeStorage()

      const user = validateAdminCredentials(data.username, data.password)

      if (!user) {
        setErrors({
          form: "Invalid username or password",
        })
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        })
        return
      }

      setAdminSession(user.id)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const field = err.path[0]
          newErrors[field as string] = err.message
        })
        setErrors(newErrors)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Sign in to manage leads</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setErrors((prev) => ({ ...prev, username: "" }))
              }}
              placeholder="Enter username"
              disabled={loading}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev) => ({ ...prev, password: "" }))
              }}
              placeholder="Enter password"
              disabled={loading}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs font-medium text-blue-900 mb-1">Demo Credentials:</p>
            <p className="text-xs text-blue-800">
              Username: <span className="font-mono">admin</span>
            </p>
            <p className="text-xs text-blue-800">
              Password: <span className="font-mono">admin123</span>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
