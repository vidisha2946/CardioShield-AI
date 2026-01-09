import React from 'react';
import DiagnosticForm from './components/DiagnosticForm';
import { FaHeartbeat, FaNotesMedical, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const DiagnosticPage = () => {
    return (
        <div className="diagnostic-page">
            <div className="diagnostic-full-width">
                <div className="diagnostic-header">
                    <h2 className="section-title">
                        <FaHeartbeat style={{ marginRight: '0.5rem', color: 'var(--primary)' }} />
                        Diagnostic Assessment
                    </h2>
                    <p className="section-subtitle">Please fill in all health metrics accurately for the most precise AI prediction.</p>
                </div>
                
                <div className="diagnostic-form-container">
                     <DiagnosticForm />
                </div>
                
                <div className="diagnostic-footer-info">
                    <div className="info-card">
                        <h3><FaInfoCircle /> Did you know?</h3>
                        <p>Cardiovascular diseases (CVDs) are the leading cause of death globally. Early detection using AI tools can significantly improve prevention strategies.</p>
                    </div>
                    
                    <div className="info-card">
                        <h3><FaExclamationTriangle /> Key Risk Factors</h3>
                        <ul>
                             <li>High Blood Pressure (Hypertension) + High Cholesterol</li>
                             <li>Smoking, Excessive Alcohol, & Physical Inactivity</li>
                             <li>Obesity & Unhealthy Diet</li>
                        </ul>
                    </div>
                    
                    <div className="info-card highlight">
                        <h3><FaNotesMedical /> Medical Disclaimer</h3>
                        <p>This tool uses a Machine Learning model (Random Forest/XGBoost) for estimation. It is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticPage;
