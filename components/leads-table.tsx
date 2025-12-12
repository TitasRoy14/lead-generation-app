"use client"

import { useState, useEffect } from "react"
import type { Lead } from "@/lib/schemas"
import { getLeads, updateLead, deleteLead, initializeStorage } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const STATUS_OPTIONS = ["Enquired", "Attempted", "Demo Assign", "Demo Complete", "Invoice Send", "Enroll"]

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Lead>>({})
  const { toast } = useToast()

  useEffect(() => {
    initializeStorage()
    loadLeads()
  }, [])

  const loadLeads = () => {
    const allLeads = getLeads()
    setLeads(allLeads)
  }

  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleEdit = (lead: Lead) => {
    setEditingId(lead.id)
    setEditForm(lead)
  }

  const handleSaveEdit = (id: string) => {
    try {
      const updated = updateLead(id, editForm)
      if (updated) {
        toast({
          title: "Success",
          description: "Lead updated successfully",
        })
        setEditingId(null)
        loadLeads()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      })
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        if (deleteLead(id)) {
          toast({
            title: "Success",
            description: "Lead deleted successfully",
          })
          loadLeads()
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete lead",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads</CardTitle>
        <CardDescription>Manage and track all inquiries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Search leads by name, email, phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 min-w-[120px]">Name</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 min-w-[180px]">Email</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 min-w-[120px]">Phone</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 min-w-[100px]">
                      Curriculum
                    </th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 min-w-[80px]">Grade</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 min-w-[140px]">Status</th>
                    <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-900 min-w-[180px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        {editingId === lead.id ? (
                          <>
                            <td className="py-3 px-2 sm:px-4">
                              <Input
                                value={editForm.name || ""}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                                className="h-9 text-sm min-w-[100px]"
                              />
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <Input
                                value={editForm.email || ""}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                                className="h-9 text-sm min-w-[150px]"
                              />
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <Input
                                value={editForm.phone || ""}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                                className="h-9 text-sm min-w-[100px]"
                              />
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <Input
                                value={editForm.curriculum || ""}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, curriculum: e.target.value }))}
                                className="h-9 text-sm min-w-[90px]"
                              />
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <Input
                                value={editForm.grade || ""}
                                onChange={(e) => setEditForm((prev) => ({ ...prev, grade: e.target.value }))}
                                className="h-9 text-sm min-w-[70px]"
                              />
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <select
                                value={editForm.status || "Enquired"}
                                onChange={(e) =>
                                  setEditForm((prev) => ({
                                    ...prev,
                                    status: e.target.value as Lead["status"],
                                  }))
                                }
                                className="w-full min-w-[120px] h-9 px-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="flex gap-2 min-w-[160px]">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveEdit(lead.id)}
                                  className="h-9 text-xs px-3 flex-1"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingId(null)}
                                  className="h-9 text-xs px-3 flex-1"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="max-w-[150px] truncate">{lead.name}</div>
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="max-w-[200px] truncate">{lead.email}</div>
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="max-w-[120px] truncate">{lead.phone}</div>
                            </td>
                            <td className="py-3 px-2 sm:px-4">{lead.curriculum}</td>
                            <td className="py-3 px-2 sm:px-4">{lead.grade}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="flex gap-2 min-w-[160px]">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(lead)}
                                  className="h-9 text-xs px-3 flex-1"
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDelete(lead.id)}
                                  className="h-9 text-xs px-3 flex-1"
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 pt-2">
          Total leads: <span className="font-semibold">{filteredLeads.length}</span>
        </div>
      </CardContent>
    </Card>
  )
}
