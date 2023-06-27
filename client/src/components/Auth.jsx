import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import MainIcon from "../assets/logo2.png";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Register = ({ handleSubmit, switchMode, changeHandler }) => (
  <div className="auth__form-container">
    <div className="auth__form-container_fields">
      <div className="auth__form-container_fields-content">
        <div className="auth__form-container_header">
          <img
            src={MainIcon}
            alt="logo"
            width="48"
            style={{ borderRadius: "50px" }}
          />
          <p>Sign Up</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="test">
            <div className="test2">
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={changeHandler}
                  required
                ></input>
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={changeHandler}
                  required
                ></input>
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={changeHandler}
                  required
                ></input>
              </div>
            </div>
            <div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={changeHandler}
                  required
                ></input>
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={changeHandler}
                  required
                ></input>
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Passsword</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Passsword"
                  onChange={changeHandler}
                  required
                ></input>
              </div>
            </div>
          </div>
          <div className="auth__form-container_fields-content_button">
            <button>Sign Up</button>
          </div>
        </form>
        <div className="auth__form-container_fields-account">
          <p>
            Already have an account?
            <span onClick={switchMode}> Sign In</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Login = ({ handleSubmit, switchMode, changeHandler }) => (
  <div className="auth__form-container">
    <div className="auth__form-container_fields">
      <div className="auth__form-container_fields-content">
        <div className="auth__form-container_header">
          <img
            src={MainIcon}
            alt="logo"
            width="48"
            style={{ borderRadius: "50px" }}
          />
          <p>Sign In</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="auth__form-container_fields-content_input">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={changeHandler}
              required
            ></input>
          </div>
          <div className="auth__form-container_fields-content_input">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={changeHandler}
              required
            ></input>
          </div>
          <div className="auth__form-container_fields-content_button">
            <button>Sign In</button>
          </div>
        </form>
        <div className="auth__form-container_fields-account">
          <p>
            Don't have an account?
            <span onClick={switchMode}> Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

function Auth() {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, phoneNumber, avatarURL } = form;
    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      fullName: form.fullName,
      password,
      avatarURL,
      phoneNumber,
    });

    cookies.set("token", token);
    cookies.set("fullName", fullName);
    cookies.set("username", username);
    cookies.set("userId", userId);
    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  if (isSignup) {
    return (
      <Register
        switchMode={switchMode}
        handleSubmit={handleSubmit}
        changeHandler={changeHandler}
      />
    );
  }
  if (!isSignup) {
    return (
      <Login
        switchMode={switchMode}
        handleSubmit={handleSubmit}
        changeHandler={changeHandler}
      />
    );
  }
}

export default Auth;

// return (
// <div className="auth__form-container">
//   <div className="auth__form-container_fields">
//     <div className="auth__form-container_fields-content">
//       <div className="auth__form-container_header">
//         <img
//           src={MainIcon}
//           alt="logo"
//           width="48"
//           style={{ borderRadius: "50px" }}
//         />
//         <p>{isSignup ? "Sign Up" : "Sign In"}</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {isSignup && (
//           <div className="auth__form-container_fields-content_input">
//             <label htmlFor="fullName">Full Name</label>
//             <input
//               name="fullName"
//               type="text"
//               placeholder="Full Name"
//               onChange={changeHandler}
//               required
//             ></input>
//           </div>
//         )}
//         <div className="auth__form-container_fields-content_input">
//           <label htmlFor="username">Username</label>
//           <input
//             name="username"
//             type="text"
//             placeholder="Username"
//             onChange={changeHandler}
//             required
//           ></input>
//         </div>
//         {isSignup && (
//           <div className="auth__form-container_fields-content_input">
//             <label htmlFor="phoneNumber">Phone Number</label>
//             <input
//               name="phoneNumber"
//               type="text"
//               placeholder="Phone Number"
//               onChange={changeHandler}
//               required
//             ></input>
//           </div>
//         )}
//         {isSignup && (
//           <div className="auth__form-container_fields-content_input">
//             <label htmlFor="avatarURL">Avatar URL</label>
//             <input
//               name="avatarURL"
//               type="text"
//               placeholder="Avatar URL"
//               onChange={changeHandler}
//               required
//             ></input>
//           </div>
//         )}
//         <div className="auth__form-container_fields-content_input">
//           <label htmlFor="password">Password</label>
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             onChange={changeHandler}
//             required
//           ></input>
//         </div>
//         {isSignup && (
//           <div className="auth__form-container_fields-content_input">
//             <label htmlFor="confirmPassword">Confirm Passsword</label>
//             <input
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm Passsword"
//               onChange={changeHandler}
//               required
//             ></input>
//           </div>
//         )}
//         <div className="auth__form-container_fields-content_button">
//           <button>{isSignup ? "Sign Up" : "Sign In"}</button>
//         </div>
//       </form>
//       <div className="auth__form-container_fields-account">
//         <p>
//           {isSignup ? "Already have an account?" : "Don't have an account?"}
//           <span onClick={switchMode}>
//             {isSignup ? "Sign In" : "Sign Up"}
//           </span>
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// );
