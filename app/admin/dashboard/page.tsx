"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAdminSession, clearAdminSession } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import LeadsTable from "@/components/leads-table"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const session = getAdminSession()
    if (!session) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    clearAdminSession()
    router.push("/admin/login")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white border-b p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 z-10">
        <h1 className="text-xl sm:text-2xl font-bold">Lead Management Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto bg-transparent">
          Logout
        </Button>
      </div>

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <LeadsTable />
      </div>
    </main>
  )
}
