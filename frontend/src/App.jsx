import React, { useState } from "react";
import "./App.css";

import Analyzer from "./pages/Analyzer";
import Results from "./pages/Results";

function App() {
  const [page, setPage] = useState("home");
  const [analysis, setAnalysis] = useState(null);

  const handleStart = () => {
    setPage("analyzer");
  };

  const handleBack = () => {
    setPage("home");
  };

  const handleAnalyze = (result) => {
    console.log("APP RECEIVED ANALYSIS:", result);

    if (!result) {
      console.error("No analysis result received.");
      return;
    }

    setAnalysis(result);
    setPage("results");
  };

  const handleRestart = () => {
    setAnalysis(null);
    setPage("analyzer");
  };

  /* =========================
     HOME PAGE
  ========================= */

  if (page === "home") {
    return (
      <div className="app">

        <div className="home-page">

          <header className="home-header">

            <div className="home-logo">

              <div className="home-logo-icon">
                ✦
              </div>

              <span>
                Career<span>Lens</span>{" "}
                <small>AI</small>
              </span>

            </div>

            <nav>
              <button
                onClick={handleStart}
              >
                Home
              </button>

              <button
                onClick={handleStart}
              >
                How It Works
              </button>

              <button
                onClick={handleStart}
              >
                Features
              </button>

              <button
                className="home-get-started"
                onClick={handleStart}
              >
                Get Started →
              </button>
            </nav>

          </header>


          <section className="home-hero">

            <div className="home-left">

              <div className="home-label">
                ✨ AI-POWERED CAREER INTELLIGENCE
              </div>

              <h1>
                Turn Your
                <br />
                Resume
                <br />
                Into Your
                <br />

                <span>Career Roadmap.</span>
              </h1>

              <p>
                Discover your skill gaps, understand
                what employers are looking for, and
                build a personalized career roadmap
                using AI.
              </p>

              <button
                className="hero-button"
                onClick={handleStart}
              >
                Analyze My Resume
                <span>→</span>
              </button>

            </div>


            <div className="home-right">

              <div className="preview-card">

                <div className="preview-top">

                  <div>
                    <small>
                      ✦ AI ANALYSIS
                    </small>

                    <h2>
                      AI / ML Engineer
                    </h2>
                  </div>

                  <div className="preview-match">
                    <small>
                      Job Match
                    </small>

                    <strong>
                      82%
                    </strong>
                  </div>

                </div>


                <div className="preview-content">

                  <div className="preview-circle">

                    <div>
                      <strong>
                        82
                      </strong>

                      <small>
                        % MATCH
                      </small>
                    </div>

                  </div>


                  <div className="preview-info">

                    <span>
                      Career Fit
                    </span>

                    <h3>
                      Excellent
                    </h3>

                    <div className="preview-bar">
                      <div></div>
                    </div>

                    <small>
                      18 of 22 skills matched
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </div>
    );
  }


  /* =========================
     ANALYZER PAGE
  ========================= */

  if (page === "analyzer") {
    return (
      <Analyzer
        onBack={handleBack}
        onAnalyze={handleAnalyze}
      />
    );
  }


  /* =========================
     RESULTS PAGE
  ========================= */

  if (page === "results") {
    return (
      <Results
        analysis={analysis}
        onBack={handleBack}
        onRestart={handleRestart}
      />
    );
  }


  return null;
}

export default App;