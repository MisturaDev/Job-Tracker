
# JobTracker - Your Career Journey Manager

**Tagline:** "Track your applications. Manage your career journey."

A clean, professional job application tracking tool with a deep purple accent theme.

---

## 🎨 Design & Branding
- **Primary color:** Deep purple for buttons, headers, and highlights
- **Background:** Clean white/light gray for readability
- **Style:** Modern, minimal, and professional
- **Fully responsive** for desktop and mobile

---

## 🔐 Authentication
- **Sign up page** with email and password
- **Login page** with session management
- **Protected routes** - only logged-in users can access the dashboard

---

## 📊 Dashboard
- **Stats overview cards** showing:
  - Total applications
  - Interviews scheduled
  - Offers received
  - Rejection count
- **Applications list** with quick status indicators
- **Filter by status** (All, Applied, Interview, Offer, Rejected)

---

## 📝 Job Application Management
Each application includes:
- Company name
- Role / Position
- Location (Remote, On-site, Hybrid)
- Application link (clickable)
- Date applied
- Status dropdown (Applied, Interview, Offer, Rejected)
- Notes section for interview details or reminders

**Actions:**
- **Add** new applications via a modal/form
- **Edit** existing applications
- **Delete** with confirmation

---

## 📱 Pages Structure
1. **Landing page** - Hero section with tagline and login/signup CTAs
2. **Login / Sign up** - Authentication forms
3. **Dashboard** - Main hub with stats and application list
4. **Add/Edit Application** - Form modal for managing jobs

---

## ⚙️ Technical Implementation
- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS with deep purple theme
- **Backend:** Supabase for database and authentication
- **Database table:** `applications` with user-linked rows
- **Row Level Security:** Users only see their own applications

