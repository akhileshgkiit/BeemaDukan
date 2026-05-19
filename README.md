# BeemaDukan 🛡️

BeemaDukan is a modern, responsive, and interactive multi-page insurance portal localized specifically for the **Nepalese market**. It features a custom luxury glassmorphism design system built with clean, semantic web standards.

---

## 🚀 Key Features

### 1. Interactive "EDI" Premium Calculator
- Computes real-time premium estimates for **Health, Vehicle, and Life Insurance**.
- Displays an **Equated Daily Installment (EDI)** (e.g., `रु23/day`) to highlight micro-payment affordability.

### 2. Live Claim Intimation & Status Tracker
- **File a Claim:** Tabbed panel with form inputs and a mock file uploader showing a visual percentage progress bar.
- **Track Status:** Live timeline checker showing verification and payout progress when searching for Claim IDs (e.g., `BD-9841`).

### 3. Interactive Slide-Out Detail Drawer
- Allows users to click on any of the specialized life policies (Child, Endowment, Whole Life, etc.) to trigger a luxury glassmorphism drawer sliding in from the right with detailed eligibility criteria and benefits.

### 4. Interactive Plan Comparison & Filter Tables
- Side-by-side comparison tables comparing real Nepalese insurers (Shikhar, NLG, Nepal Life, Neco, LIC Nepal) on **Claim Settlement Ratios (CSR)**, **Active Policies**, and **Premiums**.
- Interactive sorting and filtering controls (e.g., *Lowest Price First*, *Top Settlement*, *1M+ Active Policies*).

### 5. Smart Recommendation Quiz Engine
- A 4-step recommendation quiz that analyzes user profiles to suggest specific Nepalese insurance policies along with estimated starting premiums and quick-action buy links.

### 6. Global Floating Callback Widget
- Elegant floating widget with Nepalese phone number validation that initiates a live, active **15-minute agent callback countdown timer** upon submission.

### 7. Dedicated Authentication Experience
- Form validation checks for 10-digit local Nepalese phone numbers and strong password security checks.

---

## 🛠️ Technology Stack
* **Markup:** Semantic HTML5
* **Styling:** Custom Vanilla CSS3 (Navy & Emerald theme, Glassmorphism gradients, animations)
* **Logic:** Vanilla JavaScript (ES6+)
* **Icons:** Phosphor Icons

---

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akhileshgkiit/BeemaDukan.git
   cd BeemaDukan
   ```

2. **Open the project:**
   * Double-click `index.html` to open it directly in your web browser.
   * Alternatively, serve it locally using:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Or using Node.js
     npx serve
     ```
   * Open `http://localhost:8000` in your web browser.

---

## 🏛️ Regulatory Context
Designed in alignment with standard guidelines corresponding to **Beema Pradhikaran** (Nepal Insurance Authority).
