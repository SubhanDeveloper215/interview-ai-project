import React, { useEffect, useState } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import LoadingScreen from '../../../components/LoadingScreen.jsx'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-8-8 18-2-8-8-2Z" /></svg>) },
]

const QUESTION_META = [
    { topic: 'Database', level: 'Medium' },
    { topic: 'Backend', level: 'Medium' },
    { topic: 'Full Stack', level: 'Easy' },
    { topic: 'Architecture', level: 'Medium' },
]

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    const meta = QUESTION_META[index % QUESTION_META.length]

    return (
        <article className='q-card'>
            <button className='q-card__header' type='button' onClick={() => setOpen(value => !value)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <span className='q-card__content'>
                    <span className='q-card__question'>{item.question}</span>
                    <span className='q-card__meta'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" /><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></svg>
                            {meta.topic}
                        </span>
                        <span className={`q-card__level q-card__level--${meta.level.toLowerCase()}`}>
                            {meta.level}
                        </span>
                    </span>
                </span>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </button>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </article>
    )
}

const RoadMapDay = ({ day }) => (
    <article className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>D{day.day}</span>
            <div>
                <p>Day {day.day}</p>
                <h3 className='roadmap-day__focus'>{day.focus}</h3>
            </div>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, index) => (
                <li key={index}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </article>
)

const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        return (
            <LoadingScreen
                title="Loading your interview planner"
                subtitle="Preparing questions, roadmap, skill gaps, and match score."
            />
        )
    }

    const activeTitle =
        activeNav === 'technical' ? 'Technical Questions' :
            activeNav === 'behavioral' ? 'Behavioral Questions' : 'Road Map'

    const activeSubtitle =
        activeNav === 'technical' ? 'Practice and review technical questions to strengthen your concepts.' :
            activeNav === 'behavioral' ? 'Practice and review behavioral questions to sharpen your answers.' :
                'Follow this focused preparation plan and cover the most important gaps first.'

    const activeCount =
        activeNav === 'technical' ? `${report.technicalQuestions.length} questions` :
            activeNav === 'behavioral' ? `${report.behavioralQuestions.length} questions` :
                `${report.preparationPlan.length} days`

    const scoreTone =
        report.matchScore >= 60 ? 'match-score__ring--green' :
            report.matchScore >= 35 ? 'match-score__ring--orange' :
                'match-score__ring--red'

    return (
        <div className='interview-page'>
            <div className='interview-layout'>
                <nav className='interview-nav'>
                    <button className='interview-brand' type='button' onClick={() => navigate('/')}>
                        <span className='interview-brand__mark'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6 17.8 11.5 15.8a7.4 7.4 0 0 1 3.9-4l2.4-1.1a1 1 0 0 0 0-1.8l-2.3-1a7.4 7.4 0 0 1-4-4.1l-.9-2.1a1 1 0 0 0-1.8 0L8 3.8a7.4 7.4 0 0 1-4 4.1l-2.3 1a1 1 0 0 0 0 1.8l2.4 1.1a7.4 7.4 0 0 1 3.9 4l.9 2a1 1 0 0 0 1.8 0Z" /></svg>
                        </span>
                        <span>
                            <strong>Interview Planner</strong>
                            <small>AI Interview Prep  Space</small>
                        </span>
                    </button>

                    <div className='nav-content'>
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                type='button'
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button onClick={() => { getResumePdf(interviewId) }} className='button primary-button'>
                        <svg height='0.95rem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2Zm7-18v11.2l4-4 1.4 1.4L12 16l-5.4-5.4L8 9.2l4 4V2Z" /></svg>
                        <span>Download<br />Resume</span>
                        <small>Get your resume in PDF format</small>
                    </button>
                </nav>

                <main className='interview-content'>
                    <header className='content-header'>
                        <div>
                            <h2>{activeTitle}</h2>
                            <p>{activeSubtitle}</p>
                        </div>
                        <span className='content-header__count'>{activeCount}</span>
                    </header>

                    {activeNav === 'technical' && (
                        <section>
                            <div className='q-list'>
                                {report.technicalQuestions.map((question, index) => (
                                    <QuestionCard key={index} item={question} index={index} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((question, index) => (
                                    <QuestionCard key={index} item={question} index={index} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map(day => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <aside className='interview-sidebar'>
                    <div className='match-score'>
                        <p className='match-score__label'>Match Score <span>i</span></p>
                        <div
                            className={`match-score__ring ${scoreTone}`}
                            style={{
                                '--score': `${report.matchScore}%`,
                                '--score-angle': `${report.matchScore * 3.6}deg`
                            }}
                        >
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>Strong match for this role</p>
                    </div>

                    <div className='sidebar-divider' />

                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, index) => (
                                <span key={index} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview
