# SD Associates CRM - Frontend

Modern, responsive web interface for the SD Associates Vehicle Loan & Insurance Management CRM.

## ✨ Features
- **Dual CRM Modes**:
  - 🚗 **Vehicle Loan CRM**: Complete pipeline tracking from Login to Disbursed, RTO details, Seller settlements, and UTR reference tracking.
  - 🛡️ **Insurance CRM**: Policy management, auto serial numbers, IDV value calculation, and premium tracking.
- **🚨 10-Day Renewal Expiry Alert Engine**:
  - Highlights policies expiring in $\le 10$ days with high-visibility red alert banners and dynamic countdowns.
- **Card-Based Form Design**: Modern 5-card organized entry and edit modal (`#insuranceFormModal`).
- **Interactive Reports Modal**: Compact 680px dialog with pill selector grids, month-wise quick filters, and live preview counts.
- **Search & Filters**: Instant live filtering by customer name, mobile, vehicle number, bank, status, and policy type.
- **Quick Exports**: Single-click CSV export and printable PDF reports.

## 🛠️ Tech Stack
- HTML5 & Modern Semantic Markup
- Vanilla CSS3 (Custom design system, flex/grid layouts, no bulky UI libraries)
- Vanilla JavaScript (ES6+ modular client architecture)

## 🌐 Connecting to Backend
By default, the frontend interacts with the REST API at `http://localhost:4000/api`.
Configure the backend server URL if hosting frontend and backend on separate domains.
