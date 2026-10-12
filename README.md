# 🛡️ MediaTrust: Explainable AI Framework for Social Media Content Provenance & Risk Assessment

MediaTrust is an industry-grade, full-stack Explainable AI (XAI) web application designed to combat misinformation, evaluate content authenticity, and perform provenance risk assessment on social media claims and news articles.

---

## 🌟 Key Features

* **🤖 Machine Learning Inference Pipeline:** Integrates a supervised classification model powered by `Scikit-Learn` (`TfidfVectorizer` + `LogisticRegression`) trained on benchmark Kaggle fake news corpora.
* **🔍 Explainable AI (XAI) Rationale:** Generates transparent, step-by-step rationale reports outlining token distribution, linguistic triggers, and entity alignment rather than acting as a black-box model.
* **📌 Provenance & Metadata Parsing:** Cross-references input claims against historical dataset partitions to extract source attribution, author metadata, category, and publication dates.
* **⚡ Modern Responsive UI:** Built with React, Vite, and Tailwind CSS for real-time risk scoring, threat indexing, and professional security dashboard layout.
* **🔌 FastAPI High-Performance Backend:** Asynchronous REST API server configured with CORS middleware and dynamic dataset loading.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, JavaScript
* **Backend:** Python, FastAPI, Uvicorn, Pandas, Scikit-Learn
* **Data Corpus:** Kaggle Fake News Detection Benchmark Dataset
* **Version Control:** Git & GitHub

---

## 📂 Project Architecture

```text
MediaTrust/
│
├── backend/
│   ├── main.py                # FastAPI server & ML inference pipeline
│   ├── fake_news_dataset.csv  # Kaggle training corpus
│   └── req.txt                # Python backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── app.jsx            # Main React UI component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind styling
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
└── .gitignore                 # Excludes heavy datasets and virtual environments
