import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Fellow</h4>
                <h5>MIT Breakthrough Tech</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Competitive, fully-funded AI/ML program focused on hands-on
              training and real-world industry projects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Intern</h4>
                <h5>Paktolus</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Architected full-stack user management system using Django REST,
              FastAPI & Next.js. Integrated JWT auth with account lockout
              protection. Achieved 80%+ test coverage.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineering Intern</h4>
                <h5>ASAPP</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built "Extractify," an agentic NLP system for structured data
              extraction. Processed 10K+ multi-turn dialogues with 95–100%
              accuracy using LangGraph & Gemini 2.5 Flash.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Assistant</h4>
                <h5>UMass Amherst</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Evaluating AI systems for evidence-based dietary guidance in the
              ML for Education Lab. Contributing to data analysis and conference
              submissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
