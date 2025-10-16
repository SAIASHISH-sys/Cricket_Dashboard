# 🏏 Cricket Dashboard - AI-Powered Player Analytics

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://cricknext.vercel.app)
[![Python](https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1-000000?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)

**Live Demo:** [cricknext.vercel.app](https://cricknext.vercel.app)

An intelligent cricket analytics dashboard featuring real-time player statistics visualization and an AI-powered chatbot for interactive player insights.

---

## 📋 Table of Contents

- [Project Idea](#-project-idea)
- [Problem Statement](#-problem-statement)
- [Approach](#-approach)
- [Tech Stack](#-tech-stack)
- [Architecture & Pipeline](#-architecture--pipeline)
- [File Structure](#-file-structure)
- [Features](#-features)
- [Usage](#-usage)
- [Local Development](#-local-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)

---

## 💡 Project Idea

The Cricket Dashboard is an innovative web application that combines data visualization with conversational AI to provide cricket enthusiasts with an engaging way to explore player statistics. Users can:

- **Visualize Performance Trends**: Interactive charts showing runs, averages, and strike rates over the years
- **Compare Players**: Side-by-side comparison of different cricketers
- **AI Chatbot**: Ask questions about players and get intelligent, context-aware responses
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark/Light Mode**: Customizable theme for better user experience

---

## 🎯 Problem Statement

Cricket fans and analysts often struggle with:

1. **Fragmented Data**: Player statistics scattered across multiple platforms
2. **Static Information**: Lack of interactive ways to explore player data
3. **Limited Context**: Difficulty in understanding performance trends and comparisons
4. **Accessibility**: Complex tools that require technical knowledge to use
5. **No Conversational Interface**: Inability to ask natural language questions about players

**Our Solution:** A unified, interactive dashboard with AI-powered insights that makes cricket analytics accessible to everyone.

---

## 🔬 Approach

### 1. **User-Centric Design**
   - Intuitive interface with minimal learning curve
   - Visual-first approach using interactive charts
   - Responsive design for all devices

### 2. **AI Integration**
   - Google Gemini 2.0 Flash for intelligent responses
   - LangChain framework for conversation management
   - Context-aware responses based on selected player

### 3. **Performance Optimization**
   - Serverless architecture using Vercel
   - Client-side state management
   - Efficient data loading and caching

### 4. **Scalability**
   - Modular component architecture
   - Separation of concerns (Frontend/Backend)
   - Easy to extend with new features

---

## 🛠 Tech Stack

### Frontend
- **React 19.1** - Modern UI library
- **TypeScript 5.9** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Recharts** - Data visualization library
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **shadcn/ui** - Beautifully designed components
- **React Hook Form + Zod** - Form validation

### Backend
- **Flask 3.1** - Python web framework
- **LangChain** - AI framework for chatbot
- **Google Generative AI (Gemini 2.0)** - LLM for intelligent responses
- **Flask-CORS** - Cross-Origin Resource Sharing

### Deployment
- **Vercel** - Serverless deployment platform
- **Python 3.12** - Runtime environment

---

## 🏗 Architecture & Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                     (cricknext.vercel.app)                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP Requests
                 │
┌────────────────┴────────────────────────────────────────────┐
│                      Vercel Platform                         │
│  ┌──────────────────────────┬──────────────────────────┐   │
│  │   React Frontend         │   Flask Backend API      │   │
│  │   (Static Build)         │   (Serverless Function)  │   │
│  │                          │                          │   │
│  │  • Player Selection      │  • /api/chat endpoint    │   │
│  │  • Performance Charts    │  • LangChain Integration │   │
│  │  • Chatbot UI            │  • Session Management    │   │
│  │  • Theme Toggle          │  • CORS Handling         │   │
│  └──────────────────────────┴──────────────────────────┘   │
│                          │                                   │
│                          │ API Calls                        │
│                          ↓                                   │
│              ┌─────────────────────┐                        │
│              │  Google Gemini API  │                        │
│              │  (Gemini 2.0 Flash) │                        │
│              └─────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Pipeline

```
1. User Interaction
   ↓
2. Player Selection (Frontend)
   ↓
3. State Update (React)
   ↓
4. Charts Rendered (Recharts)
   ↓
5. User Asks Question (Chatbot)
   ↓
6. API Request to /api/chat
   ↓
7. LangChain Processing (Backend)
   ↓
8. Gemini AI Response Generation
   ↓
9. Response to Frontend
   ↓
10. Display in Chat UI
```

---

## 📁 File Structure

```
cricketdashboard/
├── 📁 api/
│   └── index.py                    # Vercel serverless function entry point
│
├── 📁 frontend/
│   ├── 📁 public/
│   │   ├── vite.svg               # Favicon
│   │   └── vite.jpg               # Images
│   │
│   ├── 📁 src/
│   │   ├── App.tsx                # Main application component
│   │   ├── App.css                # Application styles
│   │   ├── main.tsx               # React entry point
│   │   ├── index.css              # Global styles
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── Chatbot.tsx        # AI chatbot interface
│   │   │   ├── Player-Search.tsx  # Player selection dropdown
│   │   │   ├── Performancecharts.tsx  # Data visualization
│   │   │   ├── Mode-toggle.tsx    # Dark/Light theme toggle
│   │   │   │
│   │   │   └── 📁 ui/             # shadcn/ui components
│   │   │       ├── avatar.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── command.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── form.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── popover.tsx
│   │   │       ├── scroll-area.tsx
│   │   │       ├── select.tsx
│   │   │       └── skeleton.tsx
│   │   │
│   │   └── 📁 lib/
│   │       ├── utils.ts           # Utility functions
│   │       └── dummycricketdata.ts  # Player statistics data
│   │
│   ├── .env.example               # Environment variables template
│   ├── .env.local                 # Local development environment
│   ├── components.json            # shadcn/ui configuration
│   ├── eslint.config.js          # ESLint configuration
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Frontend dependencies
│   ├── tsconfig.json              # TypeScript configuration
│   ├── tsconfig.app.json          # App TypeScript config
│   ├── tsconfig.node.json         # Node TypeScript config
│   └── vite.config.ts             # Vite configuration
│
├── app.py                         # Flask backend application
├── requirements.txt               # Python dependencies
├── runtime.txt                    # Python version for Vercel
├── vercel.json                    # Vercel deployment configuration
├── .gitignore                     # Git ignore rules
├── .vercelignore                  # Vercel ignore rules
└── README.md                      # Project documentation
```

### Key Components Explained

#### Frontend Components

- **`App.tsx`**: Main application shell, manages global state for selected player
- **`Chatbot.tsx`**: AI chatbot interface with conversation history
- **`Player-Search.tsx`**: Searchable dropdown for player selection
- **`Performancecharts.tsx`**: Interactive charts for player statistics
- **`Mode-toggle.tsx`**: Dark/light theme switcher

#### Backend

- **`app.py`**: Flask API server with chatbot endpoint
- **`api/index.py`**: Vercel serverless function wrapper

#### Data

- **`dummycricketdata.ts`**: Contains statistics for 8 cricket players including:
  - Virat Kohli
  - Rohit Sharma
  - MS Dhoni
  - Jasprit Bumrah
  - Steve Smith
  - Kane Williamson
  - Ben Stokes
  - Rashid Khan

---

## ✨ Features

### 🎨 Interactive Dashboard
- **Player Selection**: Searchable dropdown with player details
- **Performance Visualization**:
  - Runs scored over years (Line chart)
  - Average & Strike Rate trends (Dual-axis line chart)
  - Player comparison (Bar chart)
- **Player Info Card**: Country, role, total runs, centuries

### 🤖 AI-Powered Chatbot
- **Context-Aware**: Knows which player you're viewing
- **Conversation History**: Maintains chat context per player
- **Natural Language**: Ask questions in plain English
- **Sports Journalist Persona**: Enthusiastic and knowledgeable responses

### 🎯 Player Comparison
- **Dynamic Selection**: Choose any player to compare with current selection
- **Top 3 Default**: Shows top performers by default
- **Side-by-Side Stats**: Visual comparison of runs and centuries

### 🌓 Theme Support
- **Dark Mode**: Easy on the eyes
- **Light Mode**: Clean and professional
- **Persistent**: Remembers your preference

### 📱 Responsive Design
- Mobile-friendly layout
- Tablet-optimized views
- Desktop experience

---

## 🚀 Usage

### Accessing the Application

Visit the live application at: **[cricknext.vercel.app](https://cricknext.vercel.app)**

### Step-by-Step Guide

1. **Select a Player**
   - Click on "Select player..." dropdown in the left panel
   - Search or browse through available players
   - Click on a player to select

2. **View Performance Charts**
   - Charts automatically update when you select a player
   - Hover over chart elements for detailed information
   - View runs, average, and strike rate trends

3. **Compare Players**
   - In the comparison chart, click "Compare with:" dropdown
   - Select a player to compare with your current selection
   - View side-by-side statistics

4. **Chat with AI Assistant**
   - Type your question in the chatbot input at the bottom left
   - Ask about the selected player's performance, records, or career
   - Get intelligent, context-aware responses

5. **Toggle Theme**
   - Click the theme toggle button in the top-right corner
   - Switch between dark and light modes

### Example Questions for Chatbot

- "What are Virat Kohli's career highlights?"
- "Tell me about his recent performance"
- "How does his strike rate compare to other players?"
- "What format does he perform best in?"
- "Give me some interesting facts about this player"

---

## 💻 Local Development

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.12 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SAIASHISH-sys/Cricket_Dashboard.git
   cd Cricket_Dashboard
   ```

2. **Setup Backend**
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Create .env file
   echo "GOOGLE_API_KEY=your_api_key_here" > .env
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   
   # Create local environment file
   cp .env.example .env.local
   ```

4. **Run Development Servers**

   **Terminal 1 - Backend:**
   ```bash
   # From root directory
   python app.py
   ```
   Backend runs on: `http://localhost:5000`

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

5. **Access the Application**
   - Open browser: `http://localhost:5173`
   - Start exploring cricket stats!

### Environment Variables

#### Backend (`.env`)
```env
GOOGLE_API_KEY=your_google_gemini_api_key
PORT=5000
```

#### Frontend (`frontend/.env.local`)
```env
VITE_API_URL=http://localhost:5000/api/chat
```

---

## 🌐 Deployment

### Deploying to Vercel

1. **Fork/Clone the Repository**

2. **Install Vercel CLI** (Optional)
   ```bash
   npm install -g vercel
   ```

3. **Deploy via GitHub Integration** (Recommended)
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables:
     - `GOOGLE_API_KEY`: Your Google Gemini API key
   - Deploy!

4. **Deploy via CLI**
   ```bash
   vercel
   # Follow the prompts
   
   # For production
   vercel --prod
   ```

5. **Set Environment Variables in Vercel Dashboard**
   - Go to Project Settings
   - Navigate to Environment Variables
   - Add `GOOGLE_API_KEY` for all environments

### Deployment Configuration

The project uses `vercel.json` to configure deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.py"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/index.html"
    }
  ]
}
```

---

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:5000`
- **Production**: `https://cricknext.vercel.app`

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```
THE APPLICATION IS RUNNING
```

#### 2. Chat with AI
```http
POST /api/chat
```

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Tell me about Virat Kohli's performance"
    }
  ],
  "playerId": "virat-kohli",
  "playerName": "Virat Kohli"
}
```

**Response:**
```json
{
  "reply": "Virat Kohli is one of the greatest batsmen of the modern era..."
}
```

**Error Response:**
```json
{
  "error": "No data provided"
}
```

### Rate Limiting
- Depends on Google Gemini API limits
- Approximately 60 requests per minute

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes locally
- Update documentation if needed

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Sai Ashish Mishra**

- GitHub: [@SAIASHISH-sys](https://github.com/SAIASHISH-sys)
- Project: [Cricket Dashboard](https://github.com/SAIASHISH-sys/Cricket_Dashboard)
- Live Demo: [cricknext.vercel.app](https://cricknext.vercel.app)

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the chatbot
- **shadcn/ui** for beautiful UI components
- **Vercel** for seamless deployment
- **Recharts** for data visualization
- **Cricket fans** for inspiration

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/SAIASHISH-sys/Cricket_Dashboard/issues) page
2. Open a new issue with detailed description
3. Contact via GitHub

---

## 🎯 Future Enhancements

- [ ] Real-time data integration from cricket APIs
- [ ] More players and comprehensive statistics
- [ ] Head-to-head player comparison
- [ ] Match predictions using ML
- [ ] Social sharing features
- [ ] User accounts and favorite players
- [ ] Export statistics as PDF/CSV
- [ ] Mobile app version

---

<div align="center">

**Made with ❤️ and ☕ by Sai Ashish Mishra**

⭐ **Star this repo if you found it helpful!** ⭐

[Live Demo](https://cricknext.vercel.app) • [Report Bug](https://github.com/SAIASHISH-sys/Cricket_Dashboard/issues) • [Request Feature](https://github.com/SAIASHISH-sys/Cricket_Dashboard/issues)

</div>
