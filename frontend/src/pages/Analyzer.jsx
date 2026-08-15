import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./Analyzer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

function Analyzer({ onBack, onAnalyze }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const extractTextFromPDF = async (file) => {
    try {
      setIsExtracting(true);
      setResumeText("");

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      let text = "";

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const page = await pdf.getPage(pageNumber);

        const content = await page.getTextContent();

        const pageText = content.items
          .map((item) => item.str)
          .join(" ");

        text += pageText + "\n";
      }

      const extractedText = text.trim();

      setResumeText(extractedText);

      console.log(
        "Resume text extracted:",
        extractedText.length,
        "characters"
      );

      setIsExtracting(false);
    } catch (error) {
      console.error(
        "PDF extraction error:",
        error
      );

      setIsExtracting(false);

      alert(
        "Unable to read this PDF. Please try another PDF."
      );
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setResumeFile(file);

    extractTextFromPDF(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setResumeFile(file);

    extractTextFromPDF(file);
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert("Please upload your resume first.");
      return;
    }

    if (isExtracting) {
      alert(
        "Please wait while your resume is being processed."
      );
      return;
    }

    if (!resumeText.trim()) {
      alert(
        "Resume text could not be extracted. Please upload the PDF again."
      );
      return;
    }

    if (!jobDescription.trim()) {
      alert(
        "Please enter the target job description."
      );
      return;
    }

    try {
      setIsAnalyzing(true);

      const formData = new FormData();

      formData.append(
        "resume",
        resumeFile
      );

      formData.append(
        "resumeText",
        resumeText
      );

      formData.append(
        "jobDescription",
        jobDescription
      );

      console.log(
        "Sending resume to backend..."
      );

      console.log(
        "Resume text:",
        resumeText.length,
        "characters"
      );

      console.log(
        "Job description:",
        jobDescription.length,
        "characters"
      );

      const response = await fetch(
        "https://career-lens-backend-ten.vercel.app/api/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(
        "Backend response:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Resume analysis failed."
        );
      }

      const finalAnalysisData =
        data.data;

      console.log(
        "Final analysis:",
        finalAnalysisData
      );

      if (onAnalyze) {
        onAnalyze(
          finalAnalysisData
        );
      }
    } catch (error) {
      console.error(
        "Analysis error:",
        error
      );

      alert(
        "Unable to connect to the backend. Make sure the backend server is running."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="analyzer-page">

      {/* HEADER */}

      <header className="analyzer-header">

        <button
          className="back-button"
          onClick={onBack}
          type="button"
        >
          ← Back
        </button>

        <div className="analyzer-logo">

          <div className="logo-icon">
            ✦
          </div>

          <span>
            Skill<span>Sync</span>{" "}
            <small>AI</small>
          </span>

        </div>

        <div className="header-spacer"></div>

      </header>


      {/* TITLE */}

      <section className="analyzer-intro">

        <div className="intro-label">
          ✨ AI-POWERED CAREER INTELLIGENCE
        </div>

        <h1>
          Find Your <span>Skill Gap.</span>
        </h1>

        <p>
          Upload your resume and add your
          target job. Our AI will compare
          your skills and show you exactly
          what you need to improve.
        </p>

      </section>


      {/* MAIN CARDS */}

      <main className="analyzer-container">

        {/* RESUME CARD */}

        <section className="analyzer-card">

          <div className="card-heading">

            <div className="heading-icon">
              📄
            </div>

            <div>

              <h2>
                Your Resume
              </h2>

              <p>
                Upload your latest resume
              </p>

            </div>

            <span className="step-number">
              01
            </span>

          </div>


          {!resumeFile ? (

            <label
              className="upload-area"
              onDragOver={(e) =>
                e.preventDefault()
              }
              onDrop={handleDrop}
            >

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={
                  handleFileChange
                }
                hidden
              />

              <div className="upload-icon">
                ↑
              </div>

              <h3>
                Drop your resume here
              </h3>

              <p className="browse-text">
                or click to browse
              </p>

              <p className="pdf-text">
                PDF files only
              </p>

            </label>

          ) : (

            <div className="uploaded-area">

              <div className="uploaded-file">

                <div className="file-icon">
                  📄
                </div>

                <div className="file-details">

                  <h3>
                    {resumeFile.name}
                  </h3>

                  <p>
                    {(
                      resumeFile.size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </p>

                </div>

                <div className="file-check">
                  ✓
                </div>

              </div>


              {isExtracting ? (

                <div className="extracting-message">
                  ⏳ Extracting resume text...
                </div>

              ) : (

                <div className="success-message">
                  ✓ Resume text extracted successfully
                </div>

              )}


              <label className="change-file">

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={
                    handleFileChange
                  }
                  hidden
                />

                Change Resume

              </label>

            </div>

          )}

        </section>


        {/* JOB DESCRIPTION CARD */}

        <section className="analyzer-card">

          <div className="card-heading">

            <div className="heading-icon target-icon">
              🎯
            </div>

            <div>

              <h2>
                Target Job
              </h2>

              <p>
                Tell us what you're aiming for
              </p>

            </div>

            <span className="step-number">
              02
            </span>

          </div>


          <div className="job-description-wrapper">

            <label htmlFor="jobDescription">
              Job Description
            </label>

            <textarea
              id="jobDescription"
              className="job-description-input"
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }
              placeholder="Paste the job description here..."
              spellCheck="true"
            />

            <div className="textarea-footer">

              <span>
                {jobDescription.length} characters
              </span>

              <span>
                💡 More details = better analysis
              </span>

            </div>

          </div>

        </section>

      </main>


      {/* ANALYZE BUTTON */}

      <div className="analyze-section">

        <button
          className="analyze-button"
          type="button"
          onClick={handleAnalyze}
          disabled={
            isExtracting ||
            isAnalyzing
          }
        >

          {isAnalyzing
            ? "Analyzing Resume..."
            : isExtracting
            ? "Processing Resume..."
            : "Analyze My Skill Gap"}

          <span>
            →
          </span>

        </button>

      </div>


      {/* INFO */}

      <div className="analyzer-info">

        <div>
          <span>01</span>
          Resume Analysis
        </div>

        <div>
          <span>02</span>
          Skill Gap Detection
        </div>

        <div>
          <span>03</span>
          Career Roadmap
        </div>

        <div>
          <span>04</span>
          AI Recommendations
        </div>

      </div>

    </div>
  );
}

export default Analyzer;