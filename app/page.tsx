"use client"

import LeadForm from "@/components/lead-form"
import { CheckCircle, Users, BookOpen, Award, Clock, Star, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-base sm:text-lg">E</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-none">EduLearn</h1>
            <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest">
              Mentoring Future Leaders
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-xs md:text-sm text-gray-600">Online platform for personalised coaching</p>
          <Link
            href="/admin/login"
            className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative circles - hidden on mobile for better performance */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-[20px] border-blue-100 opacity-60 hidden lg:block" />
        <div className="absolute top-20 left-20 w-48 h-48 rounded-full border-[16px] border-blue-500 opacity-30 hidden lg:block" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-50 hidden lg:block" />

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Headline and Illustration */}
            <div className="relative z-10 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight sm:leading-none mb-4 sm:mb-6">
                <span className="text-blue-600">BOOK YOUR</span>
                <br />
                <span className="text-gray-900">FREE TRIAL</span>
                <br />
                <span className="text-blue-600">CLASS</span>
              </h2>

              {/* Illustration placeholder */}
              <div className="relative mt-6 sm:mt-8">
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto lg:mx-0 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-cyan-50" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center">
                    <img
                      src="/happy-student-studying-with-books-and-laptop-carto.jpg"
                      alt="Student learning"
                      className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 object-contain"
                    />
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute -right-4 top-1/4 w-4 h-4 rounded-full bg-blue-500" />
                  <div className="absolute -right-8 top-1/3 w-3 h-3 rounded-full bg-cyan-400" />
                  <div className="absolute -left-4 bottom-1/4 w-5 h-5 rounded-full bg-blue-600" />
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl shadow-blue-100 p-6 sm:p-8 border border-gray-100">
                <LeadForm />

                <p className="mt-6 text-xs sm:text-sm text-gray-600 text-center">
                  If you are a teacher, please use this link to register{" "}
                  <button className="inline-flex items-center px-2 sm:px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded hover:bg-gray-800 transition-colors ml-1">
                    Click Now
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blue Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 sm:py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-10 text-7xl sm:text-9xl font-black text-white">3</div>
          <div className="absolute bottom-0 right-10 text-7xl sm:text-9xl font-black text-white">7</div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">One-on-One Online Classes</h3>
          <p className="text-blue-100 text-base sm:text-lg">for Grades 1 to 12 across Curriculums</p>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
        {/* Background pattern - reduced on mobile */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl sm:text-6xl text-gray-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              +
            </div>
          ))}
        </div>

        <div className="container mx-auto relative z-10">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 sm:mb-12">Our Offerings</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="space-y-4 sm:space-y-6">
              {/* Offering 1 */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    01
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-blue-600 mb-2">
                      Comprehensive Curriculum Coverage:
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      From CBSE to IB, IGCSE, and ICSE, our tailored sessions cover all major curriculums, ensuring your
                      child receives the best-in-class educational support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Offering 2 */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    02
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-blue-600 mb-2">
                      Expert-Led Classes for All Subjects:
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Specialize in Math, Science, English, and French with our certified professional teachers,
                      providing focused learning that adapts to each student's needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Offering 3 */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    03
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-blue-600 mb-2">Affordable Excellence:</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      Unlock premium education at competitive rates, starting at just AED 30 per session. Enjoy the
                      perfect blend of quality and affordability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right illustration - hidden on mobile */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full border-[16px] border-blue-100 flex items-center justify-center">
                  <img
                    src="/student-writing-exam-getting-a--grade-cartoon-illu.jpg"
                    alt="Student success"
                    className="w-64 h-64 object-contain"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-8 sm:mb-12">
            Why Choose EduLearn?
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { icon: Users, label: "Expert Tutors", color: "bg-blue-500" },
              { icon: BookOpen, label: "All Subjects", color: "bg-cyan-500" },
              { icon: Award, label: "Certified", color: "bg-blue-600" },
              { icon: Clock, label: "Flexible Hours", color: "bg-blue-400" },
              { icon: Star, label: "Top Rated", color: "bg-cyan-600" },
              { icon: CheckCircle, label: "Guaranteed", color: "bg-blue-500" },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-900">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-900 py-10 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">
            Book your free trial class today and experience the difference.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="inline-block px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-lg rounded-lg transition-colors"
          >
            Book Free Trial
          </a>
        </div>
      </section>
    </main>
  )
}
