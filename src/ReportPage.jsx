import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from './utils/reportGenerator';
import { FaFileDownload, FaArrowLeft, FaHeartbeat } from 'react-icons/fa';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const ReportPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, result } = location.state || {};

    // Redirect if no data is present
    useEffect(() => {
        if (!formData || !result) {
            navigate('/diagnostic');
        }
    }, [formData, result, navigate]);

    if (!formData || !result) return null;

    const getChartData = (prob) => [
        { name: 'Safe', uv: 100, fill: '#334155' },
        { name: 'Risk Probability', uv: prob, fill: prob > 50 ? '#f43f5e' : '#4ade80' }
    ];

    const cholMap = { '1': 'Normal', '2': 'Above Normal', '3': 'High' };
    const glucMap = { '1': 'Normal', '2': 'Above Normal', '3': 'High' };

    return (
        <div className="diagnostic-page">
            <div className="diagnostic-full-width" style={{ maxWidth: '1000px' }}>
                
                {/* Header Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn-highlight" 
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0' }}
                    >
                        <FaArrowLeft /> Back
                    </button>
                    <button 
                        onClick={() => generatePDF(formData, result)}
                        className="submit-btn"
                        style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}
                    >
                        <FaFileDownload /> Download PDF
                    </button>
                </div>

                {/* Report Card */}
                <div className="card" style={{ padding: '3rem', borderTop: `6px solid ${result.result === 1 ? '#f43f5e' : '#4ade80'}` }}>
                    
                    {/* Report Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                            <FaHeartbeat style={{ color: 'var(--primary)' }} /> CardioShield AI
                        </h1>
                        <p style={{ color: 'var(--text-muted)' }}>Advanced Cardiac Health Diagnostic Report</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* AI Result Banner */}
                    <div style={{ 
                        background: result.result === 1 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(74, 222, 128, 0.1)', 
                        padding: '2rem', 
                        borderRadius: '1rem', 
                        textAlign: 'center',
                        marginBottom: '3rem',
                        border: `1px solid ${result.result === 1 ? 'rgba(244, 63, 94, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`
                    }}>
                        <h2 style={{ fontSize: '2rem', margin: 0, color: result.result === 1 ? '#f43f5e' : '#4ade80' }}>
                            {result.result === 1 ? 'HIGH RISK DETECTED' : 'LOW RISK DETECTED'}
                        </h2>
                        <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'var(--text-main)' }}>
                            Estimated Risk Probability: <strong>{result.prob}%</strong>
                        </p>
                    </div>

                    {/* Data Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        
                        {/* Left: Patient Details */}
                        <div>
                            <h3 className="card-heading" style={{ fontSize: '1.4rem' }}>Patient Profile</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Age</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.age} Years</td></tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Gender</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.gender === '1' ? 'Female' : 'Male'}</td></tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Height</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.height} cm</td></tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Weight</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.weight} kg</td></tr>
                                    <tr><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>BMI Score</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{result.bmi}</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Right: Medical Stats */}
                        <div>
                            <h3 className="card-heading" style={{ fontSize: '1.4rem' }}>Clinical Vitals</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Blood Pressure</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.ap_hi}/{formData.ap_lo} mmHg</td></tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Cholesterol</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{cholMap[formData.cholesterol]}</td></tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Glucose</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{glucMap[formData.gluc]}</td></tr>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Smoker</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.smoke === '1' ? 'Yes' : 'No'}</td></tr>
                                    <tr><td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Alcohol Intake</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.alco === '1' ? 'Yes' : 'No'}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Risk Visualization</h4>
                         <div style={{ height: '250px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={20} data={getChartData(result.prob)} startAngle={180} endAngle={0}>
                                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
                                    <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: 0, left: 0, lineHeight: '24px', display: 'none' }} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                         </div>
                    </div>

                    {/* Recommendation Footer */}
                    <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--nav-bg)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Clinical Recommendation</h4>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
                            {result.result === 1 
                                ? "We strongly recommend consulting a cardiologist for further evaluation. Focus on lifestyle changes such as a heart-healthy diet, regular moderate exercise, and monitoring blood pressure." 
                                : "Your heart health metrics appear to be within a safe range. Maintain a healthy lifestyle, stay active, and continue regular check-ups to prevent future risks."}
                        </p>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <p>Disclaimer: This is an AI-generated report for informational purposes only. It is not a medical diagnosis.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReportPage;
