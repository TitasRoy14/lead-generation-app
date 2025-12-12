"use client"

import type React from "react"
import { useState } from "react"
import { leadFormSchema, type LeadFormData } from "@/lib/schemas"
import { saveLead, initializeStorage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { ZodError } from "zod"

const CURRICULUMS = ["CBSE", "ICSE", "IB", "IGCSE", "State Board"]
const GRADES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

export default function LeadForm() {
  const [formData, setFormData] = useState<Partial<LeadFormData>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpError, setOtpError] = useState("")
  const [loading, setLoading] = useState(false)
  const [studentConfirm, setStudentConfirm] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSendOtp = async () => {
    setLoading(true)
    setErrors({})

    try {
      // Validate email first
      if (!formData.email) {
        setErrors({ email: "Email is required to send OTP" })
        return
      }

      // Simulate sending OTP
      await new Promise((resolve) => setTimeout(resolve, 500))
      setOtpSent(true)
      toast({
        title: "OTP Sent!",
        description: "Check your email for the verification code (Demo: 123456)",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setOtpError("")
    setErrors({})

    try {
      // Validate all fields
      const dataToValidate = {
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        curriculum: formData.curriculum || "",
        grade: formData.grade || "",
      }

      leadFormSchema.parse(dataToValidate)

      // Check OTP if sent
      if (otpSent && otp !== "123456") {
        setOtpError("Invalid OTP. Demo code is 123456")
        return
      }

      // If OTP not sent yet, send it first
      if (!otpSent) {
        await handleSendOtp()
        return
      }

      initializeStorage()

      const lead = {
        id: Date.now().toString(),
        ...dataToValidate,
        status: "Enquired" as const,
        createdAt: new Date().toISOString(),
      }

      saveLead(lead)

      toast({
        title: "Success!",
        description: "Your free trial class has been booked successfully!",
      })

      setFormData({})
      setOtp("")
      setOtpSent(false)
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const field = err.path[0]
          newErrors[field as string] = err.message
        })
        setErrors(newErrors)
      } else {
        toast({
          title: "Error",
          description: "Failed to submit. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
          placeholder="Student Name"
          disabled={loading}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Email with Send OTP button */}
      <div>
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="Email ID"
            disabled={loading || otpSent}
            className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || otpSent || !formData.email}
            className="px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
          >
            {otpSent ? "Sent ✓" : "Send OTP"}
          </button>
        </div>
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* OTP Field - shown after sending */}
      {otpSent && (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value)
              setOtpError("")
            }}
            placeholder="Enter OTP (Demo: 123456)"
            disabled={loading}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
          {otpError && <p className="text-xs text-red-500 mt-1">{otpError}</p>}
        </div>
      )}

      {/* Phone */}
      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleInputChange}
          placeholder="Mobile Number (without leading 0)"
          disabled={loading}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Curriculum Dropdown */}
      <div>
        <select
          name="curriculum"
          value={formData.curriculum || ""}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white text-gray-500"
        >
          <option value="">select curriculum</option>
          {CURRICULUMS.map((c) => (
            <option key={c} value={c} className="text-gray-900">
              {c}
            </option>
          ))}
        </select>
        {errors.curriculum && <p className="text-xs text-red-500 mt-1">{errors.curriculum}</p>}
      </div>

      {/* Grade Dropdown */}
      <div>
        <select
          name="grade"
          value={formData.grade || ""}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white text-gray-500"
        >
          <option value="">select grade</option>
          {GRADES.map((g) => (
            <option key={g} value={g} className="text-gray-900">
              Grade {g}
            </option>
          ))}
        </select>
        {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade}</p>}
      </div>

      {/* Checkboxes */}
      <div className="space-y-2.5 sm:space-y-3 pt-2">
        <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={studentConfirm}
            onChange={(e) => setStudentConfirm(e.target.checked)}
            className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          />
          <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            By checking this box, I confirm that this is a student enrollment form and not intended for teachers.
          </span>
        </label>

        <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          />
          <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            I'd like to subscribe to the newsletter and receive regular offers and event updates.
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !studentConfirm}
        className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold text-base sm:text-lg rounded-lg transition-colors shadow-lg hover:shadow-xl mt-3 sm:mt-4"
      >
        {loading ? "Processing..." : "Book Now"}
      </button>
    </form>
  )
}
