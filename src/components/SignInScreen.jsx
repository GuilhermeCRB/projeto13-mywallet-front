import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";

import UserContext from "../contexts/UserContext";

import axios from "axios";
import styledComponents from "styled-components";

export default function SignInScreen() {
    const URL = "https://mywallet-gui.herokuapp.com/sign-in";
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
        alert(error.response.data);
        setDisable(false);
    }

    function saveUserInformation(response) {
        setUser(response.data);
        navigate("/wallet");
    }


    return (
        <Section>
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
                    placeholder="Senha"
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
        margin-bottom: 24px;
        color: var(--logo);
    }

    form{
        display: flex;
        flex-direction: column;

        input{
            font-size: 20px;
            width: 326px;
            height: 58px;
            margin-bottom: 13px;
            padding: 0 15px; 
            border-radius: 5px;
            border: none;
            color: black;
        }

        input::placeholder{
            color: black;
        }

        button{
            font-size: 20px;
            font-weight: bold;
            width: 326px;
            height: 46px;
            margin-bottom: 36px; 
            border-radius: 5px;
            border: none;
            color: white;
            background-color: var(--button);
        }

    }

    a{
        font-size: 15px;
        color: white;
    }
`