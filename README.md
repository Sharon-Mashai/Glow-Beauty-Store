# Frontend Mentor - GlowBeauty Store Solution

This is my **GlowBeauty Store**, a modern bookmark manager designed to help beauty and skincare enthusiasts keep track of products they want to try. The application was built using **React**, **TypeScript**, and **Vite**, demonstrating component-based architecture, responsive design, local data persistence, and interactive user experiences.

## Overview

### The Challenge

Users should be able to:

- Save beauty and skincare product bookmarks
- Edit existing bookmarks
- Delete bookmarks with a confirmation dialog
- Search bookmarks by title, URL, description, or tags
- Expand and collapse long product descriptions
- Resume unfinished bookmark drafts
- Store all data locally using the browser's localStorage
- View an optimized layout across desktop, tablet, and mobile devices
- Experience responsive interactions and hover effects throughout the application



### Links

- **Solution URL:** `https://github.com/Sharon-Mashai/Glow-Beauty-Store.git`
- **Live Site URL:** `https://glow-beauty-store-nu.vercel.app/`

---

# Getting Started

Follow these instructions to run the project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later recommended)
- npm (comes with Node.js)

You can verify your installation by running:

```bash
node -v
npm -v
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sharon-Mashai/Glow-Beauty-Store.git
```

### 2. Navigate to the project directory

```bash
cd glowbeauty-store
```

### 3. Install dependencies

```bash
npm install
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

Vite will start the application and display something similar to:

```
Local: http://localhost:5173
```

Open the URL in your browser to view the application.

The project supports **Hot Module Replacement (HMR)**, meaning your changes appear instantly without needing to refresh the browser.

---

## Building for Production

To generate an optimized production build, run:

```bash
npm run build
```

The compiled application will be generated inside the **dist** folder.

---

## Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

---

---

## My Process

### Built With

- React 19
- TypeScript
- Vite
- Hugeicons React Library
- CSS3
- Flexbox
- Responsive Design
- Component-Based Architecture
- Browser localStorage

---

### Features

- Add bookmarks for beauty and skincare products
- Edit saved bookmarks
- Delete bookmarks with confirmation
- Powerful search functionality
- Expandable product descriptions
- Draft auto-save and resume functionality
- Responsive layout for all screen sizes
- Beautiful glassmorphism-inspired interface
- Hover animations and smooth user interactions
- Persistent local storage with no backend required

---

### What I Learned

While working on this project, I learned how to:

- Build reusable React components using TypeScript.
- Manage application state for creating, editing, deleting, and searching bookmarks.
- Store and retrieve persistent data using the browser's localStorage.
- Implement draft-saving functionality that restores unfinished forms.
- Build responsive layouts that adapt seamlessly to different screen sizes.
- Create reusable modal components for user confirmations.
- Design expandable content sections for improved readability.
- Structure a scalable React project with reusable components and TypeScript interfaces.

Example of updating the bookmark list using React state:

```tsx
setBookmarks((previousBookmarks) =>
  previousBookmarks.map((bookmark) =>
    bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
  )
);
```

---

### Continued Development

In future projects, I would like to improve my skills in:

- Advanced React patterns (Context API and custom hooks)
- Global state management
- Backend integration with databases
- User authentication
- Cloud storage for bookmarks
- Filtering and sorting bookmarks
- Accessibility improvements
- Unit and integration testing
- Progressive Web App (PWA) support

---

### Useful Resources

- React Documentation – https://react.dev
- TypeScript Handbook – https://www.typescriptlang.org/docs/
- Vite Documentation – https://vite.dev
- Hugeicons – https://hugeicons.com
- MDN Web Docs – https://developer.mozilla.org

---

## Data Model

Each bookmarked product is stored as a `Link` object.

```typescript
export interface Link {
  id: number;
  title: string;
  url: string;
  description: string;
  tags: string[];
}
```

---

## How It Works

Users can:

- Add new beauty and skincare product bookmarks.
- Include product names, URLs, personal notes, and tags.
- Search bookmarks instantly using keywords.
- Edit bookmarks whenever information changes.
- Delete bookmarks safely through a confirmation dialog.
- Expand long descriptions for easier reading.
- Resume unfinished bookmarks thanks to automatic draft saving.

---

## Local Storage

The application stores all information locally in the browser using the following keys:


- `bookmarks`  Stores the complete list of saved bookmarks 
- `glowBeauty_formDraft` Stores unfinished bookmark forms 

No backend or user account is required.

---

## Author

**Sharon Mashai**

- GitHub: `https://github.com/Sharon-Mashai`

---

## Acknowledgments

Special thanks to **Mentor and Facilitator** for providing realistic front-end challenges that encourage developers to strengthen their React, TypeScript, responsive design, and UI development skills. This project also draws inspiration from modern beauty product interfaces and demonstrates practical use of local storage, reusable components, and responsive application design.