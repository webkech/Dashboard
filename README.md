# WebKech Dashboard 🚀  
**AI-Powered Website Error & Security Monitoring Dashboard**

The **WebKech Dashboard** is a modern, dark-themed Next.js application that provides real-time website error detection, security vulnerability monitoring, and AI-powered threat level scoring.  

![Dashboard Preview](./preview.png) <!-- replace with your screenshot -->

---

## 🔥 Features  

✅ User Authentication (Register/Login/Logout with validation)  
✅ Threat Level Gauge (0–100 scoring system)  
✅ Error Logs Table (filterable + searchable)  
✅ Security Monitoring with severity levels  
✅ Issue Categorization (Performance, Security, SEO, Compatibility)  
✅ Multi-Site Support (switch between websites)  
✅ Reports Export (PDF/CSV)  
✅ Notifications Center (real-time alerts)  
✅ Integrations (CMS/Hosting/GitHub mock connections)  
✅ Smooth Animations with Framer Motion  
✅ Responsive Dark UI (Primary Color: `#CB2129`)  

---

## 🛠️ Tech Stack  

- [Next.js](https://nextjs.org/) – React framework  
- [React](https://reactjs.org/) – UI components  
- [Framer Motion](https://www.framer.com/motion/) – Animations  
- CSS Modules / Global CSS – Styling  
- LocalStorage (Mock Auth) – Authentication storage  

---

## 📂 Project Structure  

/app
/auth
/login
/register
/dashboard
/overview
/logs
/security
/issues
/reports
/integrations
/notifications
/settings
/components
Navbar.js
Sidebar.js
ThreatGauge.js
ErrorTable.js
/context
AuthContext.js
/styles
globals.css
dashboard.css

yaml
Copy code

---

## 🚀 Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/YOUR_USERNAME/webkech-dashboard.git
cd webkech-dashboard
2. Install Dependencies
bash
Copy code
npm install
# or
yarn install
3. Run Development Server
bash
Copy code
npm run dev
Now open http://localhost:3000 in your browser.

🔐 Authentication Flow
Register: Enter email + password → if new, account is created.

Login: Enter valid email + password → access dashboard.

Errors handled:

Duplicate registration → "Email already registered"

Invalid password → "Invalid credentials"

Unregistered email → "Account not found. Please register first"

Logout: Clears session and redirects to login.

📊 Dashboard Pages
Overview: Threat Gauge, Health Score, Alerts Summary

Error Logs: Table of issues with severity levels

Security Monitoring: Vulnerability list + real-time simulation

Issue Categorization: Grouped issues (Performance, Security, SEO, Compatibility)

Reports: Export reports (PDF/CSV)

Integrations: Mock connect to CMS, Hosting, GitHub

Multi-Site Support: Manage multiple sites from one dashboard

Notifications: Popup alerts + history log

Settings: Profile + site management

🎨 UI & Theme
Dark background: #0F0F0F

Primary color: #CB2129

Text color: White

Severity colors:

Critical: Red

High: Orange

Warning: Yellow

Safe: Green

📦 Deployment
You can deploy easily on:

Vercel (recommended for Next.js)

Netlify

Cloudflare Pages

Example (Vercel):

bash
Copy code
npm run build
vercel deploy
🤝 Contributing
Fork this repo

Create a new branch: git checkout -b feature/new-feature

Commit changes: git commit -m "Added new feature"

Push branch: git push origin feature/new-feature

Create a Pull Request 🚀
