import { useContext, useState } from "react";
import axios from "axios";

import UserContext from "../contexts/UserContext";
import InputTypeContext from "../contexts/InputTypeContext";

export default function AddInputScreen() {

    const { inputType } = useContext(InputTypeContext)
    const { user } = useContext(UserContext);
    const URL = `http://localhost:5511/add-records/${user.userId}`;
    const config = {
        headers: { "Authorization": `Bearer ${user.token}` }
    }
    const [disable, setDisable] = useState(false);
    const [input, setInput] = useState({ type: inputType, description: "", value: "" });

    function postInput(e) {
        e.preventDefault();
        console.log("post sent")

    }

    return (
        <section>
            <header>{`Nova ${inputType}`}</header>
            <form onSubmit={postInput}>
                <input
                    value={input.value}
                    type="string"
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
        </section>
    );
}