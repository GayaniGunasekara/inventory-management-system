
# Web-Based Office Inventory Management System

A responsive and user-friendly web application designed to simplify office inventory tracking. This system helps manage stock levels, log purchases and usage, and maintain accurate inventory records with a clean and intuitive interface.

---

## 📌 Features & Functionality

### 1. User Interface (UI) Design
- Clean, modern, and visually appealing interface.
- Fully responsive layout for both desktop and mobile devices.
- Navbar for quick and easy navigation across all pages.

---

## 2. Inventory Management System (Core Modules)

### 🔹 Dashboard
- Displays a summary of overall stock levels.
- Low-stock alerts for quick attention.
- Quick links to:
  - Add Purchase  
  - Log Usage  

---

### 🔹 Inventory List Page
- Neat, sortable, and filterable list of all inventory items.
- Each item displays:
  - Name  
  - Category  
  - Initial Stock  
  - Purchased  
  - Used  
  - Current Stock  
- Add, Edit, and Delete inventory items through simple forms.
- Real-time updates using Redux state or connected API calls.

---

### 🔹 Purchase Log Page
- Form to add new purchase entries:
  - Date  
  - Item Name  
  - Category  
  - Quantity Purchased  
- List of previous purchases with:
  - Search bar  
  - Easy tracking and review  

---

### 🔹 Usage Log Page
- Form to log weekly usage:
  - Date  
  - Item Name  
  - Category  
  - Quantity Used  
- Table displaying all past usage logs.
- Supports sorting and filtering for better visibility.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux Toolkit, Vite  
- **Backend:** Node.js  
- **Styling:** CSS / TailwindCSS / Material UI  
- **State Management:** Redux  
- **Deployment:** Vercel  

---

## 🚀 Installation & Setup

### 1️⃣ Install Dependencies  
Run this inside both the `frontend` and `backend` folders (if they are separate):

```bash
npm install
