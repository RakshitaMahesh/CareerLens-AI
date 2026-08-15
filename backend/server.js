const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// FILE UPLOAD
// ==========================================

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      file.originalname.replace(/\s+/g, "-");

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

// ==========================================
// SKILL DATABASE
// ==========================================

const SKILLS = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "C",
  "C++",
  "C#",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Express",
  "SQL",
  "MySQL",
  "MongoDB",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Azure",
  "Cloud Computing",

  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Generative AI",
  "Natural Language Processing",
  "NLP",
  "Computer Vision",

  "TensorFlow",
  "PyTorch",
  "Keras",
  "Scikit-learn",
  "Pandas",
  "NumPy",

  "Data Structures",
  "Algorithms",
  "Problem Solving",

  "Power BI",
  "Tableau",
  "Data Analysis",
  "Statistics",

  "LLM",
  "Large Language Models",
  "Prompt Engineering",
  "LangChain",
  "Transformers",

  "REST API",
  "API",
  "Flask",
  "Django",

  "Communication",
  "Teamwork",
  "Leadership",
  "Agile",
  "Scrum"
];

// ==========================================
// NORMALIZE TEXT
// ==========================================

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ==========================================
// FIND SKILLS
// ==========================================

function extractSkills(text) {
  const normalized = normalizeText(text);

  const foundSkills = [];

  for (const skill of SKILLS) {
    const skillNormalized = normalizeText(skill);

    if (
      normalized.includes(skillNormalized) &&
      !foundSkills.includes(skill)
    ) {
      foundSkills.push(skill);
    }
  }

  return foundSkills;
}

// ==========================================
// GET CAREER FIT
// ==========================================

function getCareerFit(match) {
  if (match >= 80) {
    return "Excellent";
  }

  if (match >= 60) {
    return "Good";
  }

  if (match >= 40) {
    return "Developing";
  }

  return "Beginner";
}

// ==========================================
// GET TARGET ROLE
// ==========================================

function getTargetRole(jobDescription) {
  const text = jobDescription.toLowerCase();

  if (
    text.includes("machine learning engineer") ||
    text.includes("ml engineer")
  ) {
    return "Machine Learning Engineer";
  }

  if (
    text.includes("ai engineer") ||
    text.includes("artificial intelligence engineer")
  ) {
    return "AI Engineer";
  }

  if (
    text.includes("data scientist") ||
    text.includes("data science")
  ) {
    return "Data Scientist";
  }

  if (
    text.includes("software engineer") ||
    text.includes("software developer")
  ) {
    return "Software Engineer";
  }

  if (
    text.includes("frontend") ||
    text.includes("front end") ||
    text.includes("react developer")
  ) {
    return "Frontend Developer";
  }

  if (
    text.includes("backend") ||
    text.includes("back end") ||
    text.includes("node developer")
  ) {
    return "Backend Developer";
  }

  if (text.includes("full stack")) {
    return "Full Stack Developer";
  }

  return "Target Job";
}

// ==========================================
// ROADMAP GENERATOR
// ==========================================

function generateRoadmap(missingSkills) {
  const roadmap = [];

  const descriptions = {
    "Python":
      "Improve Python programming, functions, OOP and problem solving.",

    "Machine Learning":
      "Learn supervised and unsupervised learning algorithms and model evaluation.",

    "Deep Learning":
      "Learn neural networks, CNNs, RNNs, backpropagation and model training.",

    "TensorFlow":
      "Learn TensorFlow, Keras, model building, training and evaluation.",

    "PyTorch":
      "Learn PyTorch tensors, neural networks, training loops and optimization.",

    "Pandas":
      "Learn DataFrames, data cleaning, filtering, grouping and data analysis.",

    "NumPy":
      "Practice arrays, vectorization and numerical operations.",

    "NLP":
      "Learn text preprocessing, tokenization, embeddings, transformers and sentiment analysis.",

    "Natural Language Processing":
      "Learn text preprocessing, tokenization, embeddings and transformer-based NLP.",

    "Docker":
      "Learn containerization and practice deploying applications.",

    "SQL":
      "Practice queries, joins, filtering, aggregation and database design.",

    "Git":
      "Learn version control, branching, merging and collaborative development.",

    "Generative AI":
      "Learn LLMs, prompt engineering, embeddings and AI application development.",

    "Computer Vision":
      "Learn image processing, feature extraction and computer vision models.",

    "Cloud Computing":
      "Learn cloud concepts, deployment, storage and scalable application development.",

    "AWS":
      "Learn AWS fundamentals and deploy applications using cloud services.",

    "React":
      "Build responsive interfaces using components, state and React hooks.",

    "Node.js":
      "Learn backend development, APIs, asynchronous programming and server applications.",

    "MongoDB":
      "Learn document databases, CRUD operations and MongoDB integration.",

    "Scikit-learn":
      "Practice preprocessing, model training, evaluation and machine learning pipelines.",

    "Keras":
      "Build and train neural network models using Keras.",

    "Data Structures":
      "Practice arrays, linked lists, stacks, queues, trees and graphs.",

    "Algorithms":
      "Practice searching, sorting, graph algorithms and algorithmic problem solving.",

    "Problem Solving":
      "Improve logical thinking and solve programming problems regularly.",

    "Power BI":
      "Learn dashboards, data modeling and business intelligence visualization.",

    "Tableau":
      "Build interactive dashboards and analyze business datasets.",

    "Prompt Engineering":
      "Learn effective prompting techniques for modern generative AI systems.",

    "LangChain":
      "Learn how to build applications using LLM workflows and LangChain.",

    "Transformers":
      "Learn transformer architecture, attention mechanisms and NLP applications."
  };

  missingSkills.forEach((skill, index) => {
    roadmap.push({
      step: index + 1,
      title: skill,
      priority:
        index === 0
          ? "High Priority"
          : index < 3
          ? "Important"
          : "Recommended",
      description:
        descriptions[skill] ||
        `Develop practical ${skill} knowledge and apply it through projects.`,
      difficulty:
        index < 3 ? "Advanced" : "Core"
    });
  });

  return roadmap;
}

// ==========================================
// RECOMMENDATIONS
// ==========================================

function generateRecommendations(missingSkills) {
  return missingSkills.map((skill) => {
    const recommendations = {
      "Deep Learning":
        "Learn neural networks, CNNs, RNNs and model training.",

      "TensorFlow":
        "Practice TensorFlow and Keras by building machine learning models.",

      "PyTorch":
        "Learn PyTorch tensors, neural networks and training loops.",

      "Pandas":
        "Improve Pandas skills for data cleaning, filtering and analysis.",

      "NumPy":
        "Practice NumPy arrays, vectorization and numerical operations.",

      "NLP":
        "Learn NLP preprocessing, embeddings, transformers and sentiment analysis.",

      "Docker":
        "Learn Docker and practice deploying AI applications.",

      "Machine Learning":
        "Strengthen machine learning fundamentals and build practical models.",

      "Python":
        "Improve Python programming through problem solving and real-world projects.",

      "SQL":
        "Practice SQL queries, joins, aggregation and database operations.",

      "Generative AI":
        "Build applications using LLMs, prompt engineering and generative AI.",

      "Cloud Computing":
        "Learn cloud deployment and scalable application development.",

      "AWS":
        "Practice deploying applications using AWS cloud services.",

      "React":
        "Build React projects using components, hooks and state management.",

      "Data Structures":
        "Practice important data structures and solve coding problems."
    };

    return (
      recommendations[skill] ||
      `Learn ${skill} and build a practical project to strengthen your skills.`
    );
  });
}

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "SkillSync AI Backend",
    status: "running"
  });
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "SkillSync AI backend is running"
  });
});

// ==========================================
// ANALYZE RESUME
// ==========================================

app.post(
  "/api/analyze",
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log("");
      console.log("======================================");
      console.log("RESUME ANALYSIS REQUEST");
      console.log("======================================");

      // ----------------------------------
      // CHECK FILE
      // ----------------------------------

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a resume."
        });
      }

      console.log(
        "Resume:",
        req.file.originalname
      );

      // ----------------------------------
      // GET JOB DESCRIPTION
      // ----------------------------------

      const jobDescription =
        req.body.jobDescription || "";

      console.log(
        "Job description:",
        jobDescription.length,
        "characters"
      );

      if (!jobDescription.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please provide a job description."
        });
      }

      // ----------------------------------
      // RESUME TEXT
      // ----------------------------------

      /*
        The frontend already extracts the
        resume text using PDF.js.

        It is sent separately through the
        request as resumeText.
      */

      const resumeText =
        req.body.resumeText || "";

      // ----------------------------------
      // EXTRACT SKILLS
      // ----------------------------------

      const resumeSkills =
        extractSkills(resumeText);

      const jobSkills =
        extractSkills(jobDescription);

      console.log("");
      console.log("Resume Skills:");
      console.log(resumeSkills);

      console.log("");
      console.log("Job Skills:");
      console.log(jobSkills);

      // ----------------------------------
      // IF JOB SKILLS ARE FOUND
      // ----------------------------------

      let matchedSkills = [];
      let missingSkills = [];

      if (jobSkills.length > 0) {
        matchedSkills = jobSkills.filter(
          (skill) =>
            resumeSkills.some(
              (resumeSkill) =>
                normalizeText(resumeSkill) ===
                normalizeText(skill)
            )
        );

        missingSkills = jobSkills.filter(
          (skill) =>
            !matchedSkills.includes(skill)
        );
      } else {
        /*
          Fallback if the job description
          does not contain recognized skills.
        */

        matchedSkills = resumeSkills.slice(0, 6);

        missingSkills = [
          "Deep Learning",
          "TensorFlow",
          "PyTorch",
          "Pandas",
          "NumPy",
          "NLP",
          "Docker"
        ];
      }

      // ----------------------------------
      // CALCULATE MATCH
      // ----------------------------------

      let jobMatch = 0;

      if (jobSkills.length > 0) {
        jobMatch = Math.round(
          (matchedSkills.length /
            jobSkills.length) *
            100
        );
      } else {
        jobMatch = 50;
      }

      // Keep score between 0 and 100
      jobMatch = Math.max(
        0,
        Math.min(100, jobMatch)
      );

      // ----------------------------------
      // CAREER FIT
      // ----------------------------------

      const careerFit =
        getCareerFit(jobMatch);

      // ----------------------------------
      // TARGET ROLE
      // ----------------------------------

      const targetRole =
        getTargetRole(jobDescription);

      // ----------------------------------
      // ROADMAP
      // ----------------------------------

      const careerRoadmap =
        generateRoadmap(missingSkills);

      // ----------------------------------
      // RECOMMENDATIONS
      // ----------------------------------

      const recommendations =
        generateRecommendations(
          missingSkills
        );

      // ----------------------------------
      // FINAL ANALYSIS
      // ----------------------------------

      const analysis = {
        resume:
          req.file.originalname,

        targetRole,

        jobMatch,

        careerFit,

        totalJobSkills:
          jobSkills.length ||
          matchedSkills.length +
            missingSkills.length,

        matchedSkills,

        missingSkills,

        recommendations,

        careerRoadmap
      };

      // ----------------------------------
      // CONSOLE OUTPUT
      // ----------------------------------

      console.log("");
      console.log("MATCHED SKILLS:");
      console.log(matchedSkills);

      console.log("");
      console.log("MISSING SKILLS:");
      console.log(missingSkills);

      console.log("");
      console.log(
        "Match:",
        jobMatch + "%"
      );

      console.log(
        "Career Fit:",
        careerFit
      );

      console.log(
        "Target Role:",
        targetRole
      );

      console.log(
        "======================================"
      );

      // ----------------------------------
      // DELETE FILE
      // ----------------------------------

      try {
        fs.unlinkSync(
          req.file.path
        );
      } catch (deleteError) {
        console.log(
          "Could not delete uploaded file."
        );
      }

      // ----------------------------------
      // SEND RESULT
      // ----------------------------------

      res.json({
        success: true,
        message:
          "Resume analyzed successfully",
        data: analysis
      });

    } catch (error) {
      console.error(
        "Analysis error:",
        error
      );

      // Delete file if possible
      if (
        req.file &&
        req.file.path
      ) {
        try {
          fs.unlinkSync(
            req.file.path
          );
        } catch (e) {}
      }

      res.status(500).json({
        success: false,
        message:
          "Something went wrong while analyzing the resume.",
        error: error.message
      });
    }
  }
);

// ==========================================
// ERROR HANDLER
// ==========================================

app.use(
  (err, req, res, next) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
);

// ==========================================
// START SERVER
// ==========================================

module.exports = app;