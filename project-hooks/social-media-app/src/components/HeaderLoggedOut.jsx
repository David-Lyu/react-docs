import React, { useState, useContext } from "react"
import { DispatchContext } from '../app/Context'

function HeaderLoggedOut(props) {
    const appDispatch = useContext(DispatchContext);
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    appDispatch({ type: "login", data });
                } else {
                    console.log("incorrect username/password")
                }
            })
            .catch(error => console.error)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
                <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                    <input
                        name="username"
                        className="form-control form-control-sm input-dark"
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>
                <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                    <input
                        name="password"
                        className="form-control form-control-sm input-dark"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-auto">
                    <button className="btn btn-success btn-sm">
                        Sign In
            </button>
                </div>
            </div>
        </form>
    )
}

export default HeaderLoggedOut