# 📘 AI Study Guide Generator

An AI-powered tool that transforms your messy notes into structured study guides — complete with key terms, definitions, and quiz questions. Built to save students time and help them study smarter.

💡Built at UC Irvine's AWS CloudHacks 2025

---

## 🚀 Features

-  📝 **Paste or upload notes** — Supports both direct text input and `.txt` file uploads
- 🧠 **AI-powered parsing** — Extracts key terms, definitions, and important concepts using AWS Bedrock
- 📚 **Study guide generation** — Automatically creates organized, readable content from raw notes
- ❓ **Quiz question builder** — Generates flashcard-style Q&A to reinforce learning
- ⚡ **Fast & serverless backend** — Built with AWS Lambda for quick and scalable processing
- 🌐 **Modern frontend UI** — Responsive React interface, deployed with AWS Amplify
- 🔐 **Secure architecture** — Uses IAM roles to protect access across services

---

## 🛠️ Built With

- **Frontend**: JavaScript / React (hosted with AWS Amplify)
- **Backend**: Python (AWS Lambda)
- **AI Model**: AWS Bedrock
- **Routing/API**: AWS API Gateway
- **Security**: AWS IAM
- **Other tools**: dotenv, IPython, rpm (React Project Manager)

---

## 🧪 Local Development Setup

### 1. Clone the repository
git clone https://github.com/your-username/ai-study-guide-generator.git
cd ai-study-guide-generator

### 2. Install dependencies
Install the required Python libraries:
- pip install boto3 botocore IPython python-dotenv

Install rpm (React Project Manager):
- npm install -g rpm

### 3. Start the development server
- rpm run dev

## 🧩 AWS Services Used
AWS Lambda – runs the Python backend
AWS Bedrock – generates study content using foundational models
API Gateway – bridges frontend to backend
Amplify – hosts and deploys the frontend
IAM – secures resource access

## 📈 What's Next
📄 Support for PDF and DOCX uploads
📤 Export to Anki, Quizlet, or CSV
🔐 User login and saved sessions
🧠 Smarter AI with subject-specific tuning

## 🤝 Team
Built by Ryan Huynh, Kelvin Truong, and Ethan Vo


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
