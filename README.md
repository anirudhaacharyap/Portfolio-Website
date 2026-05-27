# ANI // BACKEND_ENGINEER & RESEARCHER // PORTFOLIO

A high-performance, brutalist-styled terminal portfolio website engineered with Next.js, Framer Motion, and Resend. Designed with pixel-perfect monospace spacing, dynamic telemetry process grids, and secure asynchronous mail-routing server actions.

---

## ⚡ TECH STACK & CONFIGURATION

- **Framework**: [Next.js 16.2](https://nextjs.org/) (App Router & Strict Types)
- **Styling**: Modern Tailwind CSS v4 & Brutalist Terminal Variables
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/) (Cinematic Scroll Triggering)
- **Email Routing**: Asynchronous Next.js Server Actions (`"use server"`) driven by the [Resend SDK](https://resend.com)
- **Icons**: [Lucide React](https://lucide.dev/) (Brutalist monospace-friendly suite)

---

## 💻 CORE ARCHITECTURE DETAILS

### 1. Live System Monitor Grid (`SYSTEM_MONITOR`)
- A real-time process monitoring widget above the fold. 
- Simulates background worker threads synchronizing local ML Pipelines and caching nodes. 
- Integrated with smooth anchor scrolls directing recruiters straight to project details when individual PIDs or process names are clicked.

### 2. High-Fidelity Framer Motion Scroll Pipeline
- Globally triggered scroll reveals using `whileInView` with standard viewport margins and professional custom cubic-bezier transitions (`ease: [0.25, 0.1, 0.25, 1]`).
- Custom staggering variants applied across experience records (`staggerChildren: 0.1`) and downstream metric tags (`staggerChildren: 0.06`), ensuring zero bouncy overshoots or layout displacements.

### 3. About Me Terminal shell (`recruiter_dossier.sh`)
- A custom, fully interactive terminal emulator handling real-time shell instructions (`help`, `skills`, `specs`, `neofetch`, `clear`).
- **Inner-Scroll Bound**: Fitted with local container-scoped `.scrollTo()` boundaries to prevent global page shifts during active execution.

### 4. Secure Backend Mail Delivery
- High-security contact form utilizing server-side environment variables (`RESEND_API_KEY`) to prevent client-side key leakage.
- Features brutalist error banners, automatic submit loaders (`[SENDING...]`), and active status updates (`TRANSMITTING...`) to fully verify transmission states.

---

## 🛠️ RUNNING LOCAL DIAGNOSTICS

### Development Server
Run the local dev engine with hot-reloading enabled:
```bash
npm run dev
```

### Strict Type Validation & Production Build
Compile the application and verify type check integrity:
```bash
npm run build
```

---

## 🚀 SECURE DEPLOYMENT PROTOCOL (VERCEL)

### 1. Git Push (Secrets Ignored)
All `.env` credentials, virtual debug caches, and local configurations are securely defined within the project `.gitignore` and will never be pushed to version control:
```env
# Ignored env file definition
.env*
```

### 2. Environmental Setup on Vercel
To go live on Vercel:
1. Import this repository into Vercel.
2. Go to **Settings > Environment Variables**.
3. Add your secure Resend API Key:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_YourResendApiKeyHere`
4. Click **Deploy**. Vercel will automatically parse `nextConfig` and launch your secure server actions instantly.
