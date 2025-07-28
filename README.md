# [NoteNinjas](https://devpost.com/software/ai-study-guide-generator-0hrlm1)

**NoteNinjas** is your AI-powered study sidekick that slices through your chaotic notes and transforms them into sharp, focused study guides. Using **Claude 3.7 Sonnet** from AWS Bedrock, it extracts key terms, definitions, and generates flashcards to help you master your material quickly.

💡UC Irvine AWS CloudHacks 2025 Finalists

### [Demo](https://www.youtube.com/watch?v=Rm0rGJBY15E)

---

## Features

- **Paste or upload notes** — Supports both direct text input and `.txt` file uploads
- **AI-powered parsing** — Extracts key terms, definitions, and important concepts using **Claude 3.7 Sonnet from AWS Bedrock**
- **Study guide generation** — Automatically creates organized, readable content from raw notes
- **Quiz question builder** — Generates flashcard-style Q&A to reinforce learning
- **Auditory learning** - Text-to-speech support using Amazon Polly
- **Fast & serverless backend** — Built with **AWS Lambda** for quick and scalable processing
- **Modern frontend UI** — Responsive **React** interface, deployed with **AWS Amplify**
- **Secure architecture** — Uses **IAM** roles to protect access across services

---

## Built With

- **Frontend**: JavaScript / React (hosted with AWS Amplify)
- **Backend**: Python (AWS Lambda)
- **AI Model**: Claude 3.7 Sonnet via AWS Bedrock
- **Routing/API**: AWS API Gateway
- **Security**: AWS IAM
- **Other tools**: dotenv, IPython, rpm (React Project Manager), Amazon Polly

---

## Local Development Setup

### 1. Clone the repository
git clone https://github.com/rhuynh06/NoteNinjas.git

cd NoteNinjas

### 2. Install dependencies
Install the required Python libraries:
- pip install boto3 botocore IPython python-dotenv

Install rpm (React Project Manager):
- npm install -g rpm

### 3. Start the development server
- rpm run dev

Make sure your .env file is correctly set up with API Gateway endpoint and any necessary AWS credentials.

---

## AWS Services Used
- AWS Lambda – runs the Python backend
- Claude 3.7 Sonnet (AWS Bedrock) – Extracts key study material from raw notes
- API Gateway – bridges frontend to backend
- Amplify – hosts and deploys the frontend
- IAM – secures resource access
- CloudWatch – Monitors logs and errors from Lambda for debugging and observability
- Amazon Polly – Converts AI-generated text into speech for auditory learners

---

## What's Next
- Support for PDF and DOCX uploads
- Export to Anki, Quizlet, or CSV
- User login and saved sessions
- Smarter AI with subject-specific tuning

---

## 🤝 Team
Built by Ryan Huynh, Kelvin Truong, and Ethan Vo
