import AdminLoginForm from "@/components/admin-login-form"

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-white text-3xl font-bold mb-8">Admin Portal</h1>
        <AdminLoginForm />
      </div>
    </main>
  )
}
