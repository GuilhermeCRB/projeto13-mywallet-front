import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styledComponents from "styled-components";

import UserContext from "../contexts/UserContext";
import InputTypeContext from "../contexts/InputTypeContext";

export default function WalletScreen() {

    const { inputType, setInputType } = useContext(InputTypeContext);
    const { user } = useContext(UserContext);
    const URL = `http://localhost:5511/records/${user.userId}`;
    const config = {
        headers: { "Authorization": `Bearer ${user.token}` }
    }
    const [inputList, setInputList] = useState([]);
    const navigate = useNavigate();

    let total = 0;
    inputList?.forEach(input => {
        const { value } = input;
        total += parseFloat(value.replace(",", "."));
    });

    useEffect(() => {
        const promise = axios.get(URL, config);
        promise.then(renderInputs); promise.catch(warnError);
    }, []);

    function warnError(error) {
        alert(error.response.data);
    }

    function renderInputs(response) {
        setInputList(response.data);
    }

    function addInput(type) {
        console.log(type)
        setInputType(type);
        navigate("/add-input");
    }

    return (
        <Section>
            <header>
                <p>{`Olá, ${user.userName}`}</p>
                <div className="icon" onClick={() => navigate("/")}>
                    <ion-icon name="exit-outline"></ion-icon>
                </div>
            </header>
            <ul>
                {inputList.length === 0 ?
                    <p>Não há registros de entrada ou saída</p>
                    :
                    inputList.map((input) => {
                        return (
                            <li key={input._id} >
                                <p><span>{input.date}</span> {input.description}</p>
                                <p>{input.value}</p>
                            </li>
                        );
                    })
                }
                <div className="total">
                    <p className="total-title">SALDO</p>
                    <p className="total-value">{total.toFixed(2).toString().replace(".", ",")}</p>
                </div>
            </ul>
            <div className="buttons">
                <button onClick={() => addInput("entrada")}>
                    <div className="button-icon">+</div>
                    <p>Nova entrada</p>
                </button>
                <button onClick={() => addInput("saída")}>
                    <div className="button-icon button-icon-m">-</div>
                    <p>Nova saída</p>
                </button>
            </div>
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

    header{
        font-size: 26px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        width: 326px;
        margin-bottom: 20px;
        color: white;

        .icon{
            font-size: 32px;    
        }
    }

    ul{
        overflow-y: scroll;
        width: 326px;
        height: 446px;
        padding: 23px 15px;
        margin-bottom: 13px;
        border-radius: 5px;
        background-color: white;

        li{
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            span{
                margin-right: 2px;
                color: var(--date);
            }
        }

        .total{
            position: fixed;
            z-index: 1;
            bottom: 120px;
            display: flex;
            justify-content: space-between;
            width: 296px;
            height: 30px;
            background-color: white;
        }

        .total-title{
            font-weight: bold;
        }

        .total-value{
            right: 100px;
        }
    }

    .buttons{
        display: flex;
        justify-content: space-between;
        width: 326px;
    }

    button{
        display: flex;
        flex-direction: column;
        font-size: 17px;
        font-weight: bold;
        width: 31vw;
        height: 15vh;
        padding: 10px;
        border-radius: 5px;
        border: none;
        color: white;
        background-color: var(--button);

        .button-icon{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
            width: 20px;
            height: 20px;
            font-weight: normal;
            border: solid 2px white;
            border-radius: 10px;
        }

        .button-icon-m{
            padding-bottom: 4px;
        }

        p{
            text-align: left;
            width: 50%;
            margin-top: 3vh;
        }
    }
`