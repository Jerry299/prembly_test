# React Vite App ⚛️

## Project Overview 📦

This is a React.js application project set up using Vite as the build tool. The app uses local mock data stored in a JSON file and contains two versions of a shopping cart feature: one implemented with TypeScript and the other with JavaScript.

In the `index.html` file, there are two script tags:

- `main.ts` handles the mock data JSON version of the app.
- `main2.tsx` handles the API data fetching version of the app.

This separation allows the project to demonstrate two approaches to data handling within the same codebase.

## Setup Instructions ⚙️

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (recommended version 18 or higher).

### Installation

1. Clone the repository:
2. Navigate into the project directory:
3. Install dependencies:
4. Start the development server:
5. Open your browser and go to `http://localhost:5173` (or the address shown in the terminal) to see the running app.

## Dependencies Used 🛠️

- ⚛️ **React** - UI library.
- 🔍 **TanStack Query** — Efficient data fetching, caching, and synchronization.
- 📊 **TanStack Table** — Headless UI for building powerful tables.
- 🎨 **Chakra UI** — Accessible, modular UI components.
- 🛣️ **React Router** — Client-side routing and SPA navigation.
- 🎨 **Tailwind CSS** — Utility-first CSS framework for styling.
- 📡 **Axios** — HTTP request handling.

## Project Structure 🗂️

- `mockData.json`  
    Located in the base project folder, this file contains local data used by the application.

- `src/`  
    Contains the main source code with key subfolders:
    - `api-data-fetching` — Code for fetching/handling API data.
    - `shopping-cart-ts` — TypeScript shopping cart version.
    - `shopping-cart-js` — JavaScript shopping cart version.
    - `components` — Chakra UI components.
    - `globalRedux` — Redux store.

## Screenshots (Optional) 📷

<img width="1900" height="982" alt="image" src="https://github.com/user-attachments/assets/4edc4fb1-c14d-49bf-80a8-8e6fbbdc4b12" />

