import React from 'react'
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.svg';
import google from '../../assets/images/google.svg';
import linkedin from '../../assets/images/linkedin.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './login.scss';
import { googleLoginIntiate, loginIntiate, registerIntiate } from '../../redux/actions/loginRegisterActions';
import {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Loader } from '../Loader';
export const Login = () => {
    const state = useSelector(state => state.userReducer);
    const history=useHistory();
    useEffect(() => {
        if(state.user!=null)
        {
            // console.log("in use effect");
            history.push("/");
        }
        
    }, [state.user]);
    const dispatch = useDispatch();
    const [login, setlogin] = useState(true);
    const [signUpForm, setsignUpForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [signInForm, setsignInForm] = useState({
        email: "",
        password: ""
    })
    return (
        state.loading?<Loader/>:
        <div className="login">
                <div className={`login__colored-container ${login ? 'login__colored-container--left' : 'login__colored-container--right'}`}></div>
                <div className={`login__welcome-back ${login ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                    <div className="login__welcome-back__logo-container">
                        <img className="login__welcome-back__logo-container--image" src={logo} alt="Budwriter" />
                        Budwriter
                    </div>
                    <div className="login__welcome-back__main-container">
                        <div className="login__welcome-back__main-container__text-container">
                            <span className="login__welcome-back__main-container__text-container--title">
                                Welcome Back!
                            </span>
                            <span className="login__welcome-back__main-container__text-container--secondary">
                                To keep sharing your work with us, please log in.
                            </span>
                        </div>
                        <div onClick={() => {
                            setlogin(!login)
                        }} className="login__welcome-back__main-container__button-container">
                            Sign In
                        </div>
                    </div>
                </div>
                <div className={`login__create-container ${login ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                    Create Account
                    <div className="login__create-container__social-container">
                       
                        <img className="login__create-container__social-container--google-icon" src={google} alt="" onClick={handleGoogleLogin}/>
                        
                    </div>
                    <span className="login__create-container--info-text">or use email for your registration</span>
                    <div className="login__create-container__form-container">
                        <form className="login__create-container__form-container__form" onSubmit={(e) => {
                            e.preventDefault();
                            signUp();
                        }}>
                            <input
                                className="login__create-container__form-container__form--name"
                                type="text"
                                placeholder="Name"
                                value={signUpForm.name}
                                onChange={(value) => setsignUpForm({
                                    
                                    name: value.target.value,
                                    email: signUpForm.email,
                                    password: signUpForm.password
        
                                })}
                                required />
                            <input
                                className="login__create-container__form-container__form--email"
                                // className="login__login-container__main-container__form-container__form--email"
                                type="email"
                                placeholder="Email"
                                value={signUpForm.email}
                                onChange={(value) => setsignUpForm({
                                    
                                    email: value.target.value,
                                    name: signUpForm.name,
                                    password: signUpForm.password
                                    
                                })}
                                required />
                            <input
                                className="login__create-container__form-container__form--password"
                                type="password"
                                placeholder="Password"
                                value={signUpForm.password}
                                onChange={(value) => setsignUpForm({
                                   
                                    password: value.target.value,
                                    name: signUpForm.name,
                                    email: signUpForm.email
                                    }
                                )}
                                required />
                            <button
                                className="login__create-container__form-container__form--submit">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
                <div className={`login__login-container ${!login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                    <div className="login__login-container__logo-container">
                        <img className="login__login-container__logo-container--image" src={logo} alt="Budwriter" />
                        Budwriter
                    </div>
                    <div className="login__login-container__main-container">
                        <div className="login__login-container__main-container__social-container">
                            <img className="login__login-container__main-container__social-container--google-icon" src={google} alt="" onClick={handleGoogleLogin}/>
                        </div>
                        <span className="login__login-container__main-container--info-text">or use email for your login</span>
                        <div className="login__login-container__main-container__form-container">
                            <form className="login__login-container__main-container__form-container__form" onSubmit={(e) => {
                                e.preventDefault();
                                signIn();
                            }}>
                                <input
                                    className="login__login-container__main-container__form-container__form--email"
                                    type="email"
                                    placeholder="Email"
                                    value={signInForm.email}
                                    onChange={(value) => {
                                        setsignInForm({
                                        email: value.target.value,
                                        password: signInForm.password
                                    }
                                    )}}
                                    required />
                                <input
                                    className="login__login-container__main-container__form-container__form--password"
                                    type="password"
                                    placeholder="Password"
                                    value={signInForm.password}
                                    onChange={(value) => setsignInForm({
        
                                            password: value.target.value,
                                            email: signInForm.email
                                        }
                                    )}
                                    required />
                                <button
                                    className="login__login-container__main-container__form-container__form--submit">
                                    Sign In
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`login__hello-container ${!login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                    <div className="login__welcome-back__main-container__text-container">
                        <span className="login__welcome-back__main-container__text-container--title">
                            Hello, stranger!
                            </span>
                        <span className="login__welcome-back__main-container__text-container--secondary">
                            Enter your personal details and start your own portfolio!
                        </span>
                    </div>
                    <div onClick={() => {
                        setlogin(!login);
                    }} className="login__welcome-back__main-container__button-container">
                        Sign Up
                    </div>
                </div>
            </div>
    );
    function signUp() {
        dispatch(registerIntiate(signUpForm.email,signUpForm.password,signUpForm.name));
    }

    function signIn() {
        dispatch(loginIntiate(signInForm.email,signInForm.password));
    }
    function handleGoogleLogin(){
        dispatch(googleLoginIntiate());
    }
}
