import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import styledComponents from "styled-components";

export default function SignUpScreen() {
    const URL = "http://localhost:5000";
    const [data, setData] = useState({
        name: "", email: "", password: ""
    });
    const [disable, setDisable] = useState(false);
    const Navigate = useNavigate();

    function signUp(e) {
        e.preventDefault();

        const promise = axios.post(URL, data);
        promise.then(() => Navigate("/")); promise.catch(warnError);
        setDisable(true);
    }

    function warnError(error) {
        alert(error); //TODO: back-end should send error message and status
        setDisable(false);
    }


    return (
        <Section>
            <h1>MyWallet</h1>
            <form onSubmit={signUp}>
                <input
                    value={data.name}
                    type="string"
                    placeholder="senha"
                    onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                    disabled={disable}
                    required
                />
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
                <input
                    type="password"
                    placeholder="senha"
                    disabled={disable}
                    required
                />
                <button disabled={disable} type="submit">
                    {/* {disable === false ? "Entrar" : <ThreeDots color="white" width={60} />} */}
                    <p>Cadastrar</p>
                </button>
            </form>
            <Link to={"/"} >Já tem uma conta? Entre agora!</Link>
        </Section>
    );
}

const Section = styledComponents.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--background);

    h1{
        font-family: "Saira Stencil One";
        font-size: 32px;
        color: var(--logo);
    }

    form{
        display: flex;
        flex-direction: column;
    }
`