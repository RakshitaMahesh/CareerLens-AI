import React from "react";
import "./Results.css";

function Results({ analysis, onBack, onRestart }) {
  if (!analysis) {
    return (
      <div className="results-page">
        <div className="no-results">
          <h1>No Analysis Data</h1>
          <p>Please analyze your resume first.</p>

          <button onClick={onBack}>
            ← Go to Analyzer
          </button>
        </div>
      </div>
    );
  }

  const matchedSkills = analysis.matchedSkills || [];
  const missingSkills = analysis.missingSkills || [];
  const roadmap = analysis.careerRoadmap || [];
  const recommendations = analysis.recommendations || [];

  const jobMatch = analysis.jobMatch || 0;

  return (
    <div className="results-page">

      {/* HEADER */}

      <header className="results-header">

        <button
          className="results-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="results-logo">
          <div className="logo-icon">
            ✦
          </div>

          <span>
            Career<span>Lens</span>{" "}
            <small>AI</small>
          </span>
        </div>

      </header>


      {/* HERO */}

      <section className="results-hero">

        <div className="result-label">
          ✨ AI RESUME ANALYSIS
        </div>

        <h1>
          Your Career
          <span> Analysis</span>
        </h1>

        <p>
          Here's how your resume matches the
          target job.
        </p>

      </section>


      {/* MAIN RESULT */}

      <main className="results-container">

        {/* SCORE CARD */}

        <section className="score-card">

          <div className="score-top">

            <div>

              <p className="small-label">
                TARGET ROLE
              </p>

              <h2>
                {analysis.targetRole ||
                  "Target Job"}
              </h2>

            </div>

            <div className="match-badge">
              ◉ {jobMatch}%
            </div>

          </div>


          <div className="score-content">

            {/* CIRCLE */}

            <div
              className="score-circle"
              style={{
                background: `conic-gradient(
                  #8b5cf6 ${jobMatch * 3.6}deg,
                  #252a40 ${jobMatch * 3.6}deg
                )`,
              }}
            >

              <div className="score-inner">

                <strong>
                  {jobMatch}
                </strong>

                <span>
                  % MATCH
                </span>

              </div>

            </div>


            {/* FIT */}

            <div className="career-fit">

              <p>
                Career Fit
              </p>

              <h3>
                {analysis.careerFit ||
                  "Good"}
              </h3>

              <div className="fit-bar">

                <div
                  style={{
                    width: `${jobMatch}%`,
                  }}
                ></div>

              </div>

              <small>
                {matchedSkills.length} of{" "}
                {analysis.totalJobSkills ||
                  matchedSkills.length +
                    missingSkills.length}{" "}
                skills matched
              </small>

            </div>

          </div>


          {/* MATCHED SKILLS */}

          <div className="skills-section">

            <div className="section-heading">

              <span>
                Matched Skills
              </span>

              <small>
                {matchedSkills.length} skills
              </small>

            </div>


            <div className="skill-list">

              {matchedSkills.length > 0 ? (

                matchedSkills.map(
                  (skill, index) => (

                    <span
                      className="skill matched"
                      key={index}
                    >
                      ✓ {skill}
                    </span>

                  )
                )

              ) : (

                <span className="empty-skill">
                  No matching skills found
                </span>

              )}

            </div>

          </div>


          {/* MISSING SKILLS */}

          <div className="skills-section">

            <div className="section-heading">

              <span>
                Skills To Improve
              </span>

              <small>
                {missingSkills.length} skills
              </small>

            </div>


            <div className="skill-list">

              {missingSkills.length > 0 ? (

                missingSkills.map(
                  (skill, index) => (

                    <span
                      className="skill missing"
                      key={index}
                    >
                      ⚡ {skill}
                    </span>

                  )
                )

              ) : (

                <span className="empty-skill">
                  No major skill gaps found
                </span>

              )}

            </div>

          </div>

        </section>


        {/* RECOMMENDATIONS */}

        <section className="recommendations-section">

          <div className="section-label">
            AI RECOMMENDATIONS
          </div>

          <h2>
            What you should do next
          </h2>

          <p>
            Follow these recommendations to
            improve your career readiness.
          </p>


          <div className="recommendation-grid">

            {recommendations.map(
              (recommendation, index) => (

                <div
                  className="recommendation-card"
                  key={index}
                >

                  <div className="recommendation-number">
                    0{index + 1}
                  </div>

                  <p>
                    {recommendation}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* ROADMAP */}

        <section className="roadmap-section">

          <div className="section-label">
            PERSONALIZED ROADMAP
          </div>

          <h2>
            What to learn next
          </h2>

          <p className="roadmap-subtitle">
            Your learning roadmap is generated
            from the skills missing from your
            target job.
          </p>


          <div className="roadmap-grid">

            {roadmap.map(
              (item, index) => (

                <div
                  className="roadmap-card"
                  key={index}
                >

                  <div className="roadmap-number">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </div>

                  <div className="priority">
                    {item.priority ||
                      "Recommended"}
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <small>
                    Difficulty:{" "}
                    {item.difficulty ||
                      "Core"}
                  </small>

                </div>

              )
            )}

          </div>

        </section>


        {/* CAREER INSIGHT */}

        <section className="career-section">

          <div className="section-label">
            CAREER INSIGHT
          </div>

          <h2>
            Your next move
          </h2>


          <div className="career-grid">

            <div className="career-card">

              <div className="career-icon">
                ✓
              </div>

              <h3>
                Your Strengths
              </h3>

              <p>
                You currently match{" "}
                <strong>
                  {matchedSkills.length}
                </strong>{" "}
                skills required by the
                target role.
              </p>

              <p>
                Continue improving these skills
                by building practical projects
                and solving real-world problems.
              </p>

            </div>


            <div className="career-card focus">

              <div className="career-icon">
                →
              </div>

              <h3>
                Your Focus
              </h3>

              <p>
                You have{" "}
                <strong>
                  {missingSkills.length}
                </strong>{" "}
                skill gaps to work on.
              </p>

              <p>
                Start with the high-priority
                skills shown in the roadmap
                above.
              </p>

            </div>

          </div>

        </section>


        {/* RESTART */}

        <div className="restart-section">

          <button
            className="restart-button"
            onClick={
              onRestart || onBack
            }
          >
            ← Analyze Another Resume
          </button>

        </div>

      </main>

    </div>
  );
}

export default Results;