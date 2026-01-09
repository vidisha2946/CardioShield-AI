import React from 'react';
import { FaDatabase, FaCogs, FaCheckCircle, FaLayerGroup, FaPython, FaReact } from 'react-icons/fa';
import { SiScikitlearn, SiFastapi, SiVite } from 'react-icons/si';

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">Behind the CardioShield AI</h2>
      <p className="section-subtitle">Transparency in our AI-driven approach.</p>
      
      <div className="about-grid">
        
        {/* Card 1: Data & Training */}
        <div className="about-card technical-card">
            <div className="card-header">
                <FaDatabase className="tech-icon color-blue" />
                <h3>Data & Training</h3>
            </div>
            <ul className="specs-list">
                <li><FaCheckCircle className="bullet-icon"/> <strong>Dataset:</strong> 70,000 Patient Records</li>
                <li><FaCheckCircle className="bullet-icon"/> <strong>Source:</strong> Verified Clinical Data (Kaggle)</li>
                <li><FaCheckCircle className="bullet-icon"/> <strong>Features:</strong> 13 Biometric Inputs including BP, Cholesterol, & BMI</li>
            </ul>
        </div>

        {/* Card 2: Model Performance */}
        <div className="about-card technical-card">
            <div className="card-header">
                <FaCogs className="tech-icon color-purple" />
                <h3>Model Engine</h3>
            </div>
            <ul className="specs-list">
                <li><FaCheckCircle className="bullet-icon"/> <strong>Algorithm:</strong> Logistic Regression Classifier</li>
                <li><FaCheckCircle className="bullet-icon"/> <strong>Accuracy:</strong> ~73% on Validation Set</li>
                <li><FaCheckCircle className="bullet-icon"/> <strong>Metric:</strong> Optimized for Recall (High Sensitivity)</li>
            </ul>
        </div>

        {/* Card 3: Tech Stack */}
        <div className="about-card technical-card">
             <div className="card-header">
                <FaLayerGroup className="tech-icon color-green" />
                <h3>Technology Stack</h3>
            </div>
            <div className="tech-stack-container">
                <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="tech-badge"><FaReact /> React</a>
                <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer" className="tech-badge"><SiVite /> Vite</a>
                <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" className="tech-badge"><SiFastapi /> FastAPI</a>
                <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="tech-badge"><FaPython /> Python</a>
                <a href="https://scikit-learn.org/" target="_blank" rel="noopener noreferrer" className="tech-badge"><SiScikitlearn /> Sklearn</a>
            </div>
        </div>

      </div>

      {/* Feature Weighting Section */}
      <div className="feature-weighting-section">
        <h3 className="fw-title">Clinical Feature Weighting</h3>
        <p className="fw-subtitle">These factors represent the primary coefficients influencing the LogReg prediction engine.</p>

        <div className="fw-bars-container">
            {/* Systolic BP */}
            <div className="fw-item">
                <div className="fw-header">
                    <span className="fw-label">Systolic Blood Pressure (ap_hi)</span>
                    <span className="fw-badge high">High Impact</span>
                </div>
                <div className="fw-progress-track">
                    <div className="fw-progress-fill fill-high" style={{width: '85%'}}></div>
                </div>
            </div>

            {/* Cholesterol */}
            <div className="fw-item">
                <div className="fw-header">
                    <span className="fw-label">Cholesterol Level</span>
                    <span className="fw-badge-text">Moderate</span>
                </div>
                <div className="fw-progress-track">
                    <div className="fw-progress-fill fill-mod" style={{width: '60%'}}></div>
                </div>
            </div>

             {/* Age */}
             <div className="fw-item">
                <div className="fw-header">
                    <span className="fw-label">Age (Vascular Aging)</span>
                    <span className="fw-badge-text">Moderate</span>
                </div>
                <div className="fw-progress-track">
                    <div className="fw-progress-fill fill-mod" style={{width: '50%'}}></div>
                </div>
            </div>

            {/* BMI */}
            <div className="fw-item">
                <div className="fw-header">
                    <span className="fw-label">BMI (Derived Metric)</span>
                    <span className="fw-badge-text">Lower</span>
                </div>
                <div className="fw-progress-track">
                    <div className="fw-progress-fill fill-low" style={{width: '35%'}}></div>
                </div>
            </div>
        </div>

        <div className="fw-secondary">
            <span className="fw-secondary-label">SECONDARY MARKERS:</span>
            <div className="fw-tags">
                <span className="fw-tag">Glucose</span>
                <span className="fw-tag">Physical Activity</span>
                <span className="fw-tag">Smoking</span>
                <span className="fw-tag">Alcohol</span>
                <span className="fw-tag">Pulse Pressure</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
