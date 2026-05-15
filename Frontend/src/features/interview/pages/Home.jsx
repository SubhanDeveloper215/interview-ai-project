import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import LoadingScreen from '../../../components/LoadingScreen.jsx'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeName, setResumeName ] = useState("")
    const [ formError, setFormError ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        setFormError("")

        if (!jobDescription.trim()) {
            setFormError("Please paste the target job description first.")
            return
        }

        if (!resumeFile && !selfDescription.trim()) {
            setFormError("Upload a resume PDF or add a quick self-description.")
            return
        }

        try {
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            if (data?._id) {
                navigate(`/interview/${data._id}`)
            }
        } catch (error) {
            const message = error.response?.data?.message || "Could not generate the interview strategy. Please try again."
            setFormError(message)
        }
    }

    const handleResumeChange = (event) => {
        const file = event.target.files?.[ 0 ]
        setFormError("")
        setResumeName(file ? file.name : "")
    }

    if (loading) {
        return (
            <LoadingScreen
                title="Building your interview planner"
                subtitle="Reading the role, comparing your profile, and shaping a practical prep plan."
            />
        )
    }

    return (
        <div className='home-page'>

            {/* Page Header */}
            <header className='page-header'>
                <span className='page-header__kicker'>AI Interview Prep Workspace</span>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Turn a job post, resume, and quick context into a focused prep plan for your next interview.</p>
                <div className='header-metrics' aria-label='Planner highlights'>
                    <span>Role-fit analysis</span>
                    <span>Question strategy</span>
                    <span>Road Map</span>
                </div>
                <div className='workflow-steps' aria-label='Interview plan workflow'>
                    <div className='workflow-step workflow-step--active'>
                        <span>1</span>
                        <p>Job &amp; Profile</p>
                    </div>
                    <div className='workflow-line' />
                    <div className='workflow-step'>
                        <span>2</span>
                        <p>Generate Strategy</p>
                    </div>
                    <div className='workflow-line' />
                    <div className='workflow-step'>
                        <span>3</span>
                        <p>Review &amp; Prepare</p>
                    </div>
                </div>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => {
                                setFormError("")
                                setJobDescription(e.target.value)
                            }}
                            value={jobDescription}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='dropzone__title'>{resumeName || "Click to upload or drag & drop"}</p>
                                <p className='dropzone__subtitle'>{resumeName ? "Resume attached" : "PDF only (Max 3MB)"}</p>
                                <input onChange={handleResumeChange} ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf' />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => {
                                    setFormError("")
                                    setSelfDescription(e.target.value)
                                }}
                                value={selfDescription}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className={`footer-info ${formError ? 'footer-info--error' : ''}`}>
                        {formError || "AI-Powered Strategy Generation - Approx 30s"}
                    </span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <div className='recent-reports__header'>
                        <div>
                            <span className='recent-reports__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-8 0v2" /><circle cx="12" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M2 21v-2a4 4 0 0 1 3-3.87" /></svg>
                            </span>
                            <h2>My Recent Interview Plans</h2>
                        </div>
                        <button type='button' className='view-all-btn'>View all <span>›</span></button>
                    </div>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <span className='report-item__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5" /><path d="M9 19V9" /><path d="M14 19v-6" /><path d="M19 19V3" /></svg>
                                </span>
                                <div className='report-item__content'>
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Role-fit analysis</p>
                                </div>
                                <span className='report-item__arrow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className='reports-tip'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21h6v-1H9v1Zm3-19a7 7 0 0 0-4.2 12.6c.8.6 1.2 1.4 1.2 2.4h6c0-1 .4-1.8 1.2-2.4A7 7 0 0 0 12 2Z" /></svg>
                        </span>
                        Tip: The more details you provide, the more personalized and effective your interview strategy will be.
                    </p>
                </section>
            )}
        </div>
    )
}

export default Home
