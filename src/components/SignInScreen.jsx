import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";

import axios from "axios";
// import styledComponents from "styled-components";

export default function SignInScreen() {
    const URL = "http://localhost:5000";
    const [data, setData] = useState({ email: "", password: "" });
    const [disable, setDisable] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function signIn(e) {
        e.preventDefault();
        const promise = axios.post(URL, data);
        promise.then(saveUserInformation); promise.catch(warnError);
        setDisable(true);
    }

    function warnError(error) {
        alert(error); //TODO: back-end should send error message and status
        setDisable(false);
    }

    function saveUserInformation(response) {
        setUser(response.data); //TODO: back-end should give as response {user: userName}
        navigate("/wallet");
    }


    return (
        <section>
            <h1>MyWallet</h1>
            <form onSubmit={signIn}>
                <input
                    value={data.email}
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                    disabled={disable}
                    required
                />
                <input
                    value={data.password}
                    type="password"
                    placeholder="senha"
                    onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                    disabled={disable}
                    required
                />
                <button disabled={disable} type="submit">
                    {/* {disable === false ? "Entrar" : <ThreeDots color="white" width={60} />} */}
                    <p>Entrar</p>
                </button>
            </form>
            <Link to={"/signup"} >Primeira vez? Cadastre-se!</Link>
        </section>
    );
}