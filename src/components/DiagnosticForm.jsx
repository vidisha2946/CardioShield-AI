import { useState } from 'react';
import { FaUser, FaRulerVertical, FaWeight, FaSmoking, FaWineGlassAlt, FaRunning, FaTint, FaHeartbeat, FaIdCard, FaNotesMedical, FaWalking } from 'react-icons/fa';
import { MdBloodtype, MdMonitorHeart } from 'react-icons/md';
import { GiHealthPotion } from 'react-icons/gi';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const DiagnosticForm = () => {
    const [formData, setFormData] = useState({
        age: '29',
        gender: '1',
        height: '168',
        weight: '62',
        ap_hi: '120',
        ap_lo: '80',
        cholesterol: '1',
        gluc: '1',
        smoke: '0',
        alco: '0',
        active: '1',
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Prediction failed');
            const data = await response.json();
            setResult(data);
            
            setTimeout(() => {
                const element = document.getElementById('result-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to get prediction from backend.');
        } finally {
            setLoading(false);
        }
    };

    // Chart Data Helper
    const getChartData = (prob) => {
        return [
            {
                name: 'Safe',
                uv: 100,
                fill: '#334155', 
            },
            {
                name: 'Risk Probability',
                uv: prob,
                fill: prob > 50 ? '#f43f5e' : '#4ade80', 
            }
        ];
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="diagnostic-form-layout">
                {/* Section 1: Personal Details */}
                <div className="form-section-card">
                    <h3 className="card-heading"><FaIdCard /> Personal Details</h3>
                    <div className="section-grid">
                        <div className="form-group">
                            <label className="label"><FaUser /> Age (Years)</label>
                            <input type="number" name="age" className="input" value={formData.age} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label"><FaUser /> Gender</label>
                            <select name="gender" className="select" value={formData.gender} onChange={handleChange}>
                                <option value="1">Female</option>
                                <option value="2">Male</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label"><FaRulerVertical /> Height (cm)</label>
                            <input type="number" name="height" className="input" value={formData.height} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label"><FaWeight /> Weight (kg)</label>
                            <input type="number" name="weight" className="input" value={formData.weight} onChange={handleChange} required />
                        </div>
                    </div>
                </div>

                {/* Section 2: Medical Vitals */}
                <div className="form-section-card">
                    <h3 className="card-heading"><FaNotesMedical /> Medical Vitals</h3>
                    <div className="section-grid">
                        <div className="form-group">
                            <label className="label"><MdMonitorHeart /> Systolic BP</label>
                            <input type="number" name="ap_hi" className="input" value={formData.ap_hi} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label"><MdMonitorHeart /> Diastolic BP</label>
                            <input type="number" name="ap_lo" className="input" value={formData.ap_lo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label"><MdBloodtype /> Cholesterol</label>
                            <select name="cholesterol" className="select" value={formData.cholesterol} onChange={handleChange}>
                                <option value="1">Normal</option>
                                <option value="2">Above Normal</option>
                                <option value="3">Well Above Normal</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label"><GiHealthPotion /> Glucose</label>
                            <select name="gluc" className="select" value={formData.gluc} onChange={handleChange}>
                                <option value="1">Normal</option>
                                <option value="2">Above Normal</option>
                                <option value="3">Well Above Normal</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section 3: Lifestyle */}
                <div className="form-section-card">
                    <h3 className="card-heading"><FaWalking /> Lifestyle</h3>
                    <div className="section-grid">
                        <div className="form-group">
                            <label className="label"><FaSmoking /> Smoking</label>
                            <select name="smoke" className="select" value={formData.smoke} onChange={handleChange}>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label"><FaWineGlassAlt /> Alcohol Intake</label>
                            <select name="alco" className="select" value={formData.alco} onChange={handleChange}>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="label"><FaRunning /> Physical Activity</label>
                            <select name="active" className="select" value={formData.active} onChange={handleChange}>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                        <div className="form-group hidden-on-mobile"></div>
                    </div>
                </div>

                <div className="form-submit-container">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Analyzing...' : <> <FaHeartbeat /> Analyze Risk </>}
                    </button>
                </div>
            </form>

            {result && (
                <div id="result-section" className="result-card-container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                        
                        {/* Left Side: Text and Badges */}
                        <div style={{ textAlign: 'center' }}>
                            <h3 className="label" style={{ fontSize: '1.5rem', justifyContent: 'center' }}>Analysis Result</h3>
                            <div className={`result-value ${result.result === 1 ? 'result-warning' : ''}`} style={{ fontSize: '3.5rem' }}>
                                {result.result === 1 ? 'High Risk' : 'Low Risk'}
                            </div>
                            <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                                {result.result === 1 ? 'Immediate Attention Recommended' : 'Health Metrics Look Good'}
                            </div>

                            <div className="result-stats" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
                                <div className="stat-card">
                                    <div className="label" style={{ justifyContent: 'center' }}>Probability</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>{result.prob}%</div>
                                </div>
                                <div className="stat-card">
                                    <div className="label" style={{ justifyContent: 'center' }}>BMI Score</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{result.bmi}</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Radial Chart */}
                        <div style={{ height: '300px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Risk Probability Meter</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart 
                                    innerRadius="60%" 
                                    outerRadius="100%" 
                                    barSize={20} 
                                    data={getChartData(result.prob)} 
                                    startAngle={180} 
                                    endAngle={0}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        label={{ position: 'insideStart', fill: '#fff', formatter: () => `${result.prob}%` }}
                                        background
                                        clockWise
                                        dataKey="uv"
                                    />
                                    <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{top: 0, left: 0, lineHeight: '24px', display: 'none'}} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div style={{ marginTop: '-40px', fontWeight: 'bold', fontSize: '2rem', color: result.prob > 50 ? '#f43f5e' : '#4ade80' }}>
                                {result.prob}%
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        {result.result === 1 
                            ? <p><strong>Recommendation:</strong> Consult a specialist. Focus on reducing blood pressure and maintaining a balanced diet.</p> 
                            : <p><strong>Recommendation:</strong> Keep up the good work! Regular check-ups are still advised.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiagnosticForm;
