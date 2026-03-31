# ✨ Journal App — React + Vite Frontend

A Gen Z-aesthetic journaling app that connects to a Spring Boot backend.
Warm cream tones, orange pops, neo-brutalist card shadows — inspired by Rescript Journal.

---

## 📁 Folder Structure

```
journal-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component + modal orchestration
    ├── index.css             # All global styles (CSS vars, components)
    ├── hooks/
    │   ├── useJournal.js     # API calls + state management
    │   └── useToast.js       # Toast notification system
    ├── utils/
    │   └── api.js            # Axios instance + Basic Auth config
    └── components/
        ├── JournalList.jsx       # Grid of cards + search filter
        ├── JournalCard.jsx       # Individual entry card
        ├── JournalForm.jsx       # Create / Edit modal form
        ├── ViewEntryModal.jsx    # Full-screen read view
        ├── ConfirmDeleteModal.jsx # Delete confirmation
        └── ToastContainer.jsx    # Toast notification renderer
```

---

## 🚀 Setup & Run

### 1. Prerequisites
- Node.js 18+ installed
- Spring Boot backend running on `http://localhost:8080`

### 2. Install dependencies
```bash
cd journal-app
npm install
```

### 3. Set your password
Open `src/utils/api.js` and replace the password:
```js
const PASSWORD = 'YOUR_PASSWORD_HERE'  // ← replace this
```

### 4. Start the dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 🔌 Backend API Expected

| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| GET    | /journal/        | Get all entries   |
| POST   | /journal/        | Create entry      |
| GET    | /journal/{id}    | Get single entry  |
| PUT    | /journal/{id}    | Update entry      |
| DELETE | /journal/{id}    | Delete entry      |

### Expected entry shape:
```json
{
  "id": 1,
  "title": "My first entry",
  "content": "Today was a great day...",
  "createdAt": "2024-01-01T10:00:00"
}
```

---

## ✨ Features

- 📝 Create, read, update, delete journal entries
- 🔍 Live search across title + content
- 🎨 Color-coded cards (7 accent colors, randomized by ID)
- 📖 Click any card to read the full entry
- ✅ Form validation with friendly error messages
- 🔔 Toast notifications (success / error / info)
- ⏳ Loading spinner + error recovery
- 🔐 HTTP Basic Auth (configurable)
- 📱 Fully responsive (mobile-first)

---

## 🎨 Design System

- **Fonts**: Syne (display/headings) + DM Sans (body)
- **Colors**: Cream base (#F5F0E8), Orange pop (#F4622A), Yellow burst (#F5C842)
- **Style**: Neo-brutalist shadows, warm paper aesthetic, Gen Z emojis
- **Animations**: Card pop-in, float, modal spring, toast slide-in

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview  # preview the built app
```
