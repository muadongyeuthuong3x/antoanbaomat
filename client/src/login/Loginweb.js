import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import "./login.css";
function Loginweb() {
    const [login, setlogin] = useState({
        email: "",
        password: "",
    });

    const Laydata = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setlogin({ ...login, [name]: value });
    };
    const senddata = async (event) => {
        event.preventDefault();
        const config = {
            "Content-Type": "application/json",
        };

        await axios
            .post("http://localhost:5000/user/login", login, { config })
            .then((res) => {
                Cookies.set("cookielogin", res.data.token);
                window.location.href = "/list-user";
            })
            .catch((err) => {
                console.log(err)
                return toast.error("Tài khoản không đúng ");
            });
    };
    return (
        <div className="container">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick />

            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <div className="login__field">
                            <p>User Name :</p>
                            <input
                                type="email"
                                className="login__input"
                                placeholder="Email"
                                name="email"
                                value={setlogin.email}
                                onChange={Laydata}
                            />
                        </div>
                        <div className="login__field">
                            <p>Password : </p>
                            <input
                                type="password"
                                className="login__input"
                                placeholder="Password"
                                name="password"
                                value={setlogin.password}
                                onChange={Laydata}
                                required
                            />
                        </div>
                        <button className="button login__submit" onClick={senddata}>
                            <span className="button__text" >
                                Log In Now
                            </span>
                        </button>
                    </form>
                    <div className="social-login" style={{ paddingTop: "10px" }}>
                        <h3>KMA</h3>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
}

export default Loginweb