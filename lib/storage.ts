import type { Lead, AdminUser } from "./schemas"

const LEADS_KEY = "leads"
const USERS_KEY = "users"
const SESSION_KEY = "adminSession"

const DEFAULT_ADMIN = {
  id: "1",
  username: "admin",
  password: "admin123",
}

export function initializeStorage() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(LEADS_KEY)) {
    localStorage.setItem(LEADS_KEY, JSON.stringify([]))
  }

  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]))
  }
}

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) || "[]")
  } catch {
    return []
  }
}

export function saveLead(lead: Lead): void {
  if (typeof window === "undefined") return
  try {
    const leads = getLeads()
    leads.push(lead)
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  } catch (error) {
    console.error("Error saving lead:", error)
  }
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  if (typeof window === "undefined") return null
  try {
    const leads = getLeads()
    const index = leads.findIndex((l) => l.id === id)
    if (index === -1) return null

    const updated = { ...leads[index], ...updates }
    leads[index] = updated
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
    return updated
  } catch (error) {
    console.error("Error updating lead:", error)
    return null
  }
}

export function deleteLead(id: string): boolean {
  if (typeof window === "undefined") return false
  try {
    const leads = getLeads()
    const filtered = leads.filter((l) => l.id !== id)
    localStorage.setItem(LEADS_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error("Error deleting lead:", error)
    return false
  }
}

export function getAdminUsers(): AdminUser[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
  } catch {
    return []
  }
}

export function validateAdminCredentials(username: string, password: string): AdminUser | null {
  try {
    const users = getAdminUsers()
    const user = users.find((u) => u.username === username && u.password === password)
    return user || null
  } catch (error) {
    console.error("Error validating credentials:", error)
    return null
  }
}

export function setAdminSession(userId: string): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId, timestamp: Date.now() }))
  } catch (error) {
    console.error("Error setting session:", error)
  }
}

export function getAdminSession(): { userId: string } | null {
  if (typeof window === "undefined") return null
  try {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  } catch {
    return null
  }
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch (error) {
    console.error("Error clearing session:", error)
  }
}
