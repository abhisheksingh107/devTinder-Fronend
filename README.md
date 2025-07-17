# devTinder Web

A developer networking platform inspired by Tinder, built with React, Redux Toolkit, and Socket.IO. Connect, chat, and collaborate with fellow developers!

## Features

- User authentication (Sign Up, Login, Logout)
- Profile creation and editing
- Developer feed for discovering other users
- Send and receive connection requests
- Real-time chat with connections (Socket.IO)
- Responsive UI with Tailwind CSS and DaisyUI

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router
- **Styling:** Tailwind CSS, DaisyUI
- **State Management:** Redux Toolkit
- **Real-time:** Socket.IO
- **HTTP Client:** Axios

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/devtinder-web.git
   cd devtinder-web


2. Install dependencies:
   npm install
# or
yarn install

3. Start the development server:

npm run dev
# or
yarn dev

4. The app will be available at http://localhost:5173 (or your configured Vite port).

Environment
- By default, the app connects to http://localhost:7777 for API and Socket.IO when running locally.
- For production, it uses /api as the backend base URL.


Scripts
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
License
MIT

Happy coding! ``````