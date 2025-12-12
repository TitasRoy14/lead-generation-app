# Lead Generation & Admin Portal

A modern, responsive lead generation landing page with an admin dashboard for managing student enquiries and enrollments.

## Features

### Landing Page

- 📝 Multi-step lead capture form with OTP verification
- 🎨 Modern blue-themed design with responsive layout
- 📱 Mobile-first, fully responsive design
- ✅ Form validation with Zod schemas
- 📧 Email and phone verification
- 🎓 Curriculum and grade selection dropdowns
- ✨ Animated UI elements and smooth transitions

### Admin Dashboard

- 🔐 Secure admin authentication
- 📊 Lead management interface (view, edit, delete)
- 🔄 Lead status workflow (Enquired → Enroll)
- 🔍 Search and filter functionality
- 📱 Responsive table design with horizontal scroll on mobile
- 💾 LocalStorage-based data persistence

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Validation**: Zod
- **Icons**: Lucide React
- **Storage**: LocalStorage (browser-based)

## Prerequisites

Before you begin, ensure you have installed:

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

## Installation

1. **Clone or Download the Project**
   \`\`\`bash

   # If using git

   git clone <repository-url>
   cd lead-generation-portal

   # Or download and extract the ZIP file

   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. **Run the Development Server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev
   \`\`\`

4. **Open in Browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Landing Page (Homepage)

- Visit the homepage at `http://localhost:3000`
- Fill in the lead generation form:
  - Enter email and click "Send OTP"
  - Enter OTP: `123456` (static for demo)
  - Fill in parent name, phone number
  - Select curriculum and grade
  - Check required confirmations
  - Click "Book Your Free Trial Class"

### Admin Panel

1. **Access Admin Login**

   - Click "Admin" button in the header navigation
   - Or visit `http://localhost:3000/admin/login`

2. **Login Credentials**

   - Username: `admin`
   - Password: `admin123`

3. **Manage Leads**
   - View all submitted leads in the dashboard
   - Search leads by name, email, or phone
   - Filter leads by status (All, Enquired, Enroll)
   - Edit lead information inline
   - Change lead status from "Enquired" to "Enroll"
   - Delete leads as needed
   - Logout when done

## Project Structure

\`\`\`
lead-generation-portal/
├── app/
│ ├── admin/
│ │ ├── dashboard/
│ │ │ └── page.tsx # Admin dashboard
│ │ ├── login/
│ │ │ └── page.tsx # Admin login page
│ │ └── layout.tsx # Admin layout wrapper
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Landing page
│ └── globals.css # Global styles
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── lead-form.tsx # Lead capture form
│ ├── leads-table.tsx # Admin leads table
│ └── admin-login-form.tsx # Admin login form
├── lib/
│ ├── schemas.ts # Zod validation schemas
│ ├── storage.ts # LocalStorage utilities
│ └── utils.ts # Helper functions
├── public/
│ └── \*.jpg # Images and assets
└── README.md # This file
\`\`\`

## Key Files

- **`lib/schemas.ts`**: Zod schemas for form validation
- **`lib/storage.ts`**: LocalStorage functions for data persistence
- **`components/lead-form.tsx`**: Main lead capture form component
- **`components/leads-table.tsx`**: Admin dashboard table component
- **`app/page.tsx`**: Landing page with hero, features, and form
- **`app/admin/dashboard/page.tsx`**: Admin dashboard for lead management

## Configuration

### Default OTP

The static OTP for email verification is `123456` (defined in `lib/schemas.ts`)

### Admin Credentials

Default admin credentials are stored in `lib/storage.ts`:

- Username: `admin`
- Password: `admin123`

### Storage

All data is stored in browser localStorage:

- Leads: `leads` key
- Admin session: `adminSession` key

## Customization

### Change Color Theme

Edit the CSS variables in `app/globals.css`:
\`\`\`css
--primary: 210 100% 50%; /_ Blue _/
--secondary: 195 100% 50%; /_ Cyan _/
\`\`\`

### Update Form Fields

Modify schemas in `lib/schemas.ts` and form component in `components/lead-form.tsx`

### Add Database Integration

Replace `lib/storage.ts` functions with API calls to your backend or integrate Supabase/Neon for production use.

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

Or deploy to Vercel:
\`\`\`bash

# Install Vercel CLI

npm i -g vercel

# Deploy

vercel
\`\`\`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a demo application using localStorage for data persistence
- For production use, implement proper backend database integration
- Replace static OTP with real email verification service
- Implement proper authentication with secure password hashing
- Add input sanitization and security measures

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
