const LoadingScreen = ({
    title = "Loading your interview plan",
    subtitle = "Analyzing your profile and preparing a focused workspace.",
}) => {
    return (
        <main className="loading-screen">
            <div className="loader-card" role="status" aria-live="polite">
                <div className="loader-mark" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
                <p className="loader-kicker">Resume Planner</p>
                <h1>{title}</h1>
                <p className="loader-subtitle">{subtitle}</p>
                <div className="loader-bar" aria-hidden="true">
                    <span />
                </div>
            </div>
        </main>
    )
}

export default LoadingScreen
