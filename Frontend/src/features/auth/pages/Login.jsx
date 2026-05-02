import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import LoadingScreen from '../../../components/LoadingScreen'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return (
            <LoadingScreen
                title="Opening your workspace"
                subtitle="Checking your session and getting things ready."
            />
        )
    }


    return (
        <main className="auth-page">
            <div className="form-container">
                <div className="auth-brand">
                    <p className="auth-kicker">AI powered career prep</p>
                    <h1>Resume Planner</h1>
                    <p className="auth-tagline">
                        Turn your resume into sharper interview answers and smarter job-fit insights.
                    </p>
                </div>

                <h2>Welcome back</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                    <button className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
                <p className="auth-credit">Build by Mohd Subhan</p>
            </div>
        </main>
    )
}

export default Login
