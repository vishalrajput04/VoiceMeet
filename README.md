# VoiceMeet

VoiceMeet is a real-time video meeting application built with **React, Node.js, Express, MongoDB, Socket.IO, and WebRTC**. It supports user authentication, meeting creation and joining, meeting history, real-time chat, audio/video calls, screen sharing, and browser-based live captions.

The project is organized into two independent applications: `Frontend` and `Backend`.

## Features

### Authentication & User Management

- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication with seven-day tokens.
- Protected profile and language preference APIs.

### Video Meetings

- Create and join meetings.
- Share meeting invite links with other signed-in users.
- Peer-to-peer audio and video using WebRTC.
- Camera and microphone controls.
- Screen sharing.
- Meeting history.
- Host can end a meeting; participants can leave.

### Real-time Communication

- Authenticated Socket.IO room membership.
- Real-time chat message broadcasting.
- WebRTC offer, answer, and ICE-candidate signaling.

### Live Captions & AI Integration

- Browser-based speech recognition captions in supported browsers.
- Provider adapters for:
  - Deepgram Speech-to-Text
  - LibreTranslate-compatible translation API
  - Google Cloud Text-to-Speech

> **Current Status:** In-call captions currently display original-language speech recognized by the browser. Automatic caption translation and AI voice dubbing are not yet integrated into the in-call experience. Provider adapters are available through protected backend endpoints and require their respective credentials.

## Tech Stack

**Frontend**

- React
- Vite
- Socket.IO Client
- WebRTC
- Browser Web Speech API

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcrypt

**AI / Speech Providers**

- Deepgram
- LibreTranslate-compatible API
- Google Cloud Text-to-Speech

## Project Structure

```text
VoiceMeet/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── ...
│   ├── .env.example
│   └── package.json
│
├── Backend/
│   ├── models/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── sockets/
│   ├── adapters/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

The backend separates Mongoose models, controllers, services, REST routes, middleware, Socket.IO handlers, and AI provider adapters.

The frontend separates route configuration, pages, shared components, hooks, contexts, and API/socket services. `src/App.jsx` handles router and provider setup.

## Requirements

- Node.js 20 or later
- npm
- MongoDB database (local or MongoDB Atlas)
- Modern browser with camera and microphone support

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vishalrajput04/VoiceMeet.git
cd VoiceMeet
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Copy `.env.example` to `.env` and configure:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_of_at_least_32_characters
CLIENT_ORIGIN=http://localhost:5173
PORT=5000

# Optional AI Provider Credentials
DEEPGRAM_API_KEY=

LIBRETRANSLATE_URL=
LIBRETRANSLATE_API_KEY=

GOOGLE_TTS_API_KEY=
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
```

Copy `.env.example` to `.env` and configure the API and Socket.IO base URLs using the variable names already provided in the example file.

Start the frontend:

```bash
npm run dev
```

### 4. Open the Application

Visit:

```text
http://localhost:5173
```

1. Register or log in.
2. Allow camera and microphone permissions.
3. Create a meeting.
4. Share the meeting invite link.
5. Join the meeting and use the available call controls.

## Environment Variables

### Backend

| Variable                 | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `MONGODB_URI`            | MongoDB connection string                             |
| `JWT_SECRET`             | Secret for JWT authentication (minimum 32 characters) |
| `CLIENT_ORIGIN`          | Allowed frontend origin(s), comma-separated           |
| `PORT`                   | Backend port (default: 5000)                          |
| `DEEPGRAM_API_KEY`       | Optional Deepgram credential                          |
| `LIBRETRANSLATE_URL`     | Optional translation service URL                      |
| `LIBRETRANSLATE_API_KEY` | Optional translation API key                          |
| `GOOGLE_TTS_API_KEY`     | Optional Google Text-to-Speech credential             |

### Frontend

The frontend `.env.example` contains API and Socket.IO base URL variables. Use the exact variable names provided in that file.

**Security:** Never expose backend secrets, database credentials, JWT secrets, or AI provider API keys through frontend environment variables or `VITE_` variables.

## Architecture Overview

```text
             React Frontend
                   |
          REST API / Socket.IO
                   |
             Express Backend
              /          \
          MongoDB      Socket.IO
                          |
                   WebRTC Signaling
                          |
                  Browser WebRTC
                          |
                  Audio / Video
```

Speech-related provider adapters are maintained separately on the backend and are not yet integrated into the in-call caption and audio flow.

## Deployment Notes

- Camera and microphone access require HTTPS in deployed environments.
- The current WebRTC configuration uses a public STUN server.
- Configure a TURN server for reliable connectivity across restrictive networks.
- Peer-to-peer mesh is suitable for small calls. For larger production group meetings, consider an SFU solution such as LiveKit.
- Configure `CLIENT_ORIGIN` with your deployed frontend origin.
- Keep all backend secrets on the server.

## Code Formatting

The project uses a shared Prettier configuration from the repository root.

From the `Frontend` directory:

Format the project:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Future Improvements

- Integrate real-time translated captions.
- Add AI-powered voice dubbing to live meetings.
- Improve group-call scalability using an SFU media server.
- Configure production TURN infrastructure.

## Author

**Vishal Chauhan**

- GitHub: [vishalrajput04](https://github.com/vishalrajput04)
- LinkedIn: [Vishal Chauhan](https://www.linkedin.com/in/vishal-chauhan-86134b253/)

## License

This project is available for learning and portfolio purposes. Add a license file if you intend to distribute it under specific open-source terms.
