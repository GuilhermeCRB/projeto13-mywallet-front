import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styledComponents from "styled-components";

import UserContext from "../contexts/UserContext";
import InputTypeContext from "../contexts/InputTypeContext";

export default function AddInputScreen() {

    const { inputType } = useContext(InputTypeContext)
    const { user } = useContext(UserContext);
    const URL = `https://mywallet-gui.herokuapp.com/add-records/${user.userId}`;
    const config = {
        headers: { "Authorization": `Bearer ${user.token}` }
    }
    const [disable, setDisable] = useState(false);
    const [input, setInput] = useState({ type: inputType, description: "", value: "" });
    const navigate = useNavigate();

    function postInput(e) {
        e.preventDefault();
        const promise = axios.post(URL, input, config);
        promise.then(() => navigate("/wallet")); promise.catch(warnError);
        setDisable(true);
    }

    function warnError(error) {
        alert(error.response.data);
        setDisable(false);
    }

    return (
        <Section>
            <header>{`Nova ${inputType}`}</header>
            <form onSubmit={postInput}>
                <input
                    value={input.value}
                    pattern="[0-9]{1,},[0-9]{2}"
                    placeholder="Valor"
                    onChange={(e) => { setInput({ ...input, value: e.target.value }) }}
                    disabled={disable}
                    required
                />
                <input
                    value={input.description}
                    type="string"
                    placeholder="Descrição"
                    onChange={(e) => { setInput({ ...input, description: e.target.value }) }}
                    disabled={disable}
                    required
                />
                <button disabled={disable} type="submit">
                    {/* {disable === false ? "Entrar" : <ThreeDots color="white" width={60} />} */}
                    <p>{`Salvar ${inputType}`}</p>
                </button>
            </form>
        </Section>
    );
}

const Section = styledComponents.section`
    height: 100vh;  
    background-color: var(--background);
    padding-top: 25px;

    header{
        font-size: 32px;
        font-weight: bold;
        margin: 0 0 25px 25px;
        color: var(--logo);
    }

    form{
        display: flex;
        flex-direction: column;
        margin: 0 25px 0 25px;

        input{
            font-size: 20px;
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
            height: 46px;
            margin-bottom: 36px; 
            border-radius: 5px;
            border: none;
            color: white;
            background-color: var(--button);
        }

    }
`