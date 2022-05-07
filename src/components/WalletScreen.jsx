import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styledComponents from "styled-components";

import UserContext from "../contexts/UserContext";

export default function WalletScreen() {

    const { user } = useContext(UserContext);
    const URL = `http://localhost:5511/records/${user.userId}`;
    const config = {
        headers: { "Authorization": `Bearer ${user.token}` }
    }
    const [inputList, setInputList] = useState([]);

    useEffect(() => {
        const promise = axios.get(URL, config);
        promise.then(renderInputs); promise.catch(warnError);
    }, []);

    function warnError(error) {
        alert(error.response.data);
    }

    function renderInputs(response) {
        console.log(response.data)
        setInputList(response.data);
    }

    console.log(inputList)
    return (
        <section>
            <header>
                <p>{`Olá, ${user.userName}`}</p>
                <ion-icon name="exit-outline"></ion-icon>
            </header>
            <ul>
                {inputList.length === 0 ?
                    <p>Não há registros de entrada ou saída</p>
                    :
                    inputList.map((input) => {
                        return (
                            <li key={input._id} >
                                <p>{input.date}</p>
                                <p>{input.description}</p>
                                <p>{input.value}</p>
                            </li>
                        );
                    })
                }
            </ul>
            <div>
                <button>
                    <p>+</p>
                    <p>Nova entrada</p>
                </button>
                <button>
                    <p>-</p>
                    <p>Nova saída</p>
                </button>
            </div>
        </section>
    );
}