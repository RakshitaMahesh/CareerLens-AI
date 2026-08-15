import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Target,
  BrainCircuit,
} from "lucide-react";

import "./Results.css";

function Results({ onBack }) {
  const matchedSkills = [
    "Python",
    "Machine Learning",
    "SQL",
    "Pandas",
    "NumPy",
    "Scikit-learn",
  ];

  const missingSkills = [
    {
      name: "PyTorch",
      level: "High Priority",
    },
    {
      name: "Docker",
      level: "High Priority",
    },
    {
      name: "AWS",
      level: "Medium Priority",
    },
    {
      name: "Natural Language Processing",
      level: "Medium Priority",
    },
    {
      name: "Computer Vision",
      level: "Medium Priority",
    },
  ];

  return (
    <div className="results-page">

      {/* HEADER */}

      <header className="results-header">

        <button
          className="results-back"
          onClick={onBack}
        >
          <ArrowLeft size={18} />
          Back to Analyzer
        </button>

        <div className="results-logo">

          <div className="results-logo-icon">
            <BrainCircuit size={21} />
          </div>

          <span>
            Skill<span>Sync</span>
            <small> AI</small>
          </span>

        </div>

        <div className="analysis-status">
          <span></span>
          Analysis Complete
        </div>

      </header>


      <main className="results-main">

        {/* TITLE */}

        <section className="results-title">

          <div className="results-eyebrow">
            <Sparkles size={14} />
            AI ANALYSIS COMPLETE
          </div>

          <h1>
            Your Career
            <span> Intelligence.</span>
          </h1>

          <p>
            We compared your resume with the target job
            and identified your strengths and skill gaps.
          </p>

        </section>


        {/* SCORE */}

        <section className="match-card">

          <div className="match-score">

            <div className="big-score">
              <strong>78</strong>
              <span>% MATCH</span>
            </div>

            <div className="score-info">

              <span className="small-label">
                JOB COMPATIBILITY
              </span>

              <h2>
                Good Match
              </h2>

              <p>
                You already have a strong foundation
                for this role.
              </p>

              <div className="large-progress">
                <div></div>
              </div>

              <small>
                14 of 19 required skills matched
              </small>

            </div>

          </div>

          <div className="target-role">

            <Target size={18} />

            <div>
              <span>Target Role</span>
              <strong>AI / ML Engineer</strong>
            </div>

          </div>

        </section>


        {/* SKILLS */}

        <section className="skills-results">

          <div className="result-column">

            <div className="section-heading">

              <div className="heading-symbol matched-symbol">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <h2>Matched Skills</h2>
                <p>Skills already present in your resume</p>
              </div>

              <span>{matchedSkills.length}</span>

            </div>


            <div className="result-tags">

              {matchedSkills.map((skill) => (
                <div
                  className="matched-tag"
                  key={skill}
                >
                  <CheckCircle2 size={15} />
                  {skill}
                </div>
              ))}

            </div>

          </div>


          <div className="result-column">

            <div className="section-heading">

              <div className="heading-symbol missing-symbol">
                <AlertTriangle size={19} />
              </div>

              <div>
                <h2>Skill Gaps</h2>
                <p>Skills you should improve</p>
              </div>

              <span>{missingSkills.length}</span>

            </div>


            <div className="missing-list">

              {missingSkills.map((skill) => (

                <div
                  className="missing-item"
                  key={skill.name}
                >

                  <div>
                    <strong>{skill.name}</strong>
                    <span>{skill.level}</span>
                  </div>

                  <Target size={15} />

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ROADMAP */}

        <section className="roadmap-card">

          <div className="roadmap-heading">

            <div className="roadmap-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <span>PERSONALIZED AI ROADMAP</span>
              <h2>
                What you should learn next
              </h2>
            </div>

          </div>


          <div className="roadmap">

            <div className="roadmap-step">

              <div className="step-number">
                01
              </div>

              <div>
                <strong>PyTorch</strong>
                <p>
                  Learn deep learning model development
                  and neural network training.
                </p>
              </div>

              <span className="priority high">
                HIGH
              </span>

            </div>


            <div className="roadmap-step">

              <div className="step-number">
                02
              </div>

              <div>
                <strong>Docker</strong>
                <p>
                  Learn containerization and deploying
                  machine learning applications.
                </p>
              </div>

              <span className="priority high">
                HIGH
              </span>

            </div>


            <div className="roadmap-step">

              <div className="step-number">
                03
              </div>

              <div>
                <strong>AWS</strong>
                <p>
                  Understand cloud deployment and
                  machine learning infrastructure.
                </p>
              </div>

              <span className="priority medium">
                MEDIUM
              </span>

            </div>


            <div className="roadmap-step">

              <div className="step-number">
                04
              </div>

              <div>
                <strong>NLP</strong>
                <p>
                  Build knowledge of transformers,
                  text processing and language models.
                </p>
              </div>

              <span className="priority medium">
                MEDIUM
              </span>

            </div>

          </div>

        </section>


        <div className="results-footer">

          <button
            className="new-analysis-button"
            onClick={onBack}
          >
            Analyze Another Resume
          </button>

        </div>

      </main>

    </div>
  );
}

export default Results;