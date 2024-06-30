import React, { useState, useEffect } from 'react';

const Login = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');

    if (error) {
      if (error === 'signin') {
        setAlertMessage('Please sign up before you login.');
      } else if (error === 'signup') {
        setAlertMessage('User already exists. Please log in.');
      }
    }
  }, []);

  const handleToggle = () => {
    setRightPanelActive(!rightPanelActive);
  };

  return (
    <div>
        <style>
        {
            `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

:root {
  --linear-grad: linear-gradient(to right, #c03535,  #ff4b4b);
  --grad-clr1: #c03535;
  --grad-clr2: #ff4b4b;
}

body {
  height: 100vh; 
  background: #f6f5f7;
  display: grid;
  place-content: center; 
  font-family: 'Poppins', sans-serif;
}

.container {
  position: relative; 
  width: 850px;
  height: 500px; 
  background-color: #FFF;
  box-shadow: 25px 30px 55px #5557;
  border-radius: 13px;
  overflow: hidden;
}

.form-container {
  position: absolute; 
  width: 60%;
  height: 100%;
  padding: 0px 40px; 
  transition: all 0.6s ease-in-out;
}

.sign-up-container {
  opacity: 0;
  z-index: 1;
}

.sign-in-container {
  z-index: 2;
}

form {
  height: 100%;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 50px;  
}

h1 {
  color: #333;
  font-size: 2em; /* Set the font-size to your desired size */
  font-weight: 700; /* Set the font-weight to make it bold */
}

.social-container {
  margin: 20px 0px; 
}

.social-container a {
  border: 1px solid #DDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px; 
  height: 40px;
  width: 40px;
}

span {
  font-size: 12px;
}

.infield {
  position: relative;
  margin: 8px 0px; 
  width: 100%;
}

input {
  width: 100%;
  padding: 12px 15px; 
  background-color: #f3f3f3;
  border: none;
  outline: none;
}

label {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  width: 0%;
  height: 2px;
  background: var(--linear-grad);
  transition: width 0.3s ease;
}

input:focus ~ label {
  width: 100%;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none; 
  margin: 15px 0px;
}

a.forgot {
  padding-bottom: 3px;
  border-bottom: 2px solid #EEE; 
}

button {
  border-radius: 20px;
  border: 1px solid var(--grad-clr1);
  background: var(--grad-clr2);
  color: #FFF;
  font-size: 12px;
  font-weight: bold; 
  letter-spacing: 1px;
  text-transform: uppercase; 
}

.form-container button {
  margin-top: 17px;
  transition: 80ms ease-in;
}

.form-container button:hover {
  background: #FFF;
  color: var(--grad-clr1);
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 60%;
  width: 40%;
  height: 100%;
  overflow: hidden; 
  transition: transform 0.6s ease-in-out;
  z-index: 9;
} 

#overlayBtn {
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 68%;
  transform: translateX(-50%);
  width: 143.67px;
  height: 40px; 
  border: 1px solid #FFF;
  background: transparent; 
  border-radius: 20px;
} 

.overlay {
  position: relative;
  background: var(--linear-grad);
  color: #FFF;
  left: -150%;
  height: 100%;
  width: 250%;
  transition: transform 0.6s ease-in-out;
} 

.overlay-panel {
  position: absolute; 
  display: flex;
  align-items: center;
  justify-content: center; 
  flex-direction: column;
  padding: 0px 40px;
  text-align: center;
  height: 100%;
  width: 340px;  
  transition: 0.6s ease-in-out;
} 

.overlay-left {
  right: 60%;
  transform: translateX(-12%);
}

.overlay-right {
  right: 0;
  transform: translateX(0%);
} 

.overlay-panel h1 {
  color: #FFF; 
  font-size: 2em; /* Ensure the same font-size as the h1 in the form */
  font-weight: 700; /* Ensure the same font-weight as the h1 in the form */
}

p {
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 25px 0px 35px;
}

.overlay-panel button {
  border: none;
  background-color: transparent;
} 

.right-panel-active .overlay-container {
  transform: translateX(-150%);
}

.right-panel-active .overlay {
  transform: translateX(50%);
}

.right-panel-active .overlay-left {
  transform: translateX(25%);
}

.right-panel-active .overlay-right {
  transform: translateX(35%);
}

.right-panel-active .sign-in-container {
  transform: translateX(20%);
  opacity: 0;
}

.right-panel-active .sign-up-container {
  transform: translateX(66.7%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 50% {
    opacity: 0;
    z-index: 1;
  }
  50.1%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.btnScaled {
  animation: scaleBtn 0.6s;
}

@keyframes scaleBtn {
  0% {
    width: 143.67px;
  }
  50% {
    width: 250px;
  }
  100% {
    width: 143.67px;
  }
}

.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  appearance: none; 
  background-color: #131314;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #e3e3e3;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
  border-color: #8e918f;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #13131461;
  border-color: #8e918f1f;
}

.gsi-material-button:disabled .gsi-material-button-state {
  background-color: #e3e3e31f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state, 
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: white;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: white;
  opacity: 8%;
}
            `
        }
        </style>
        <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
      {/* Add alert div here */}
      {alertMessage && <div id="alert"><div className="alert">{alertMessage}</div></div>}
      <div className="form-container sign-up-container">
        <form action="http://localhost:3000/auth/google-signup" method="get">
          <h1>Create Account</h1>
          <button className="gsi-material-button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: 'block' }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Sign up with Google</span>
              <span style={{ display: 'none' }}>Sign up with Google</span>
            </div>
          </button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="http://localhost:3000/auth/google-signin" method="get">
          <h1>Sign in</h1>
          <button className="gsi-material-button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: 'block' }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Sign in with Google</span>
              <span style={{ display: 'none' }}>Sign in with Google</span>
            </div>
          </button>
        </form>
      </div>
      <div className="overlay-container" id="overlayCon">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To stay updated on your important events, please log in with your Gmail account.</p>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome to Email2Event!</h1>
            <p>Sign up to get started and never miss a crucial event again!</p>
          </div>
        </div>
        <button id="overlayBtn" onClick={handleToggle}>
          {rightPanelActive ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
