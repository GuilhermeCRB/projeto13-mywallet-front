import styledComponents from "styled-components";

export default function Inputs({ input }) {
    return (
        <>
            <Input inputType={input.type}>
                <p><span>{input.date}</span> {input.description}</p>
                <p className="value">{input.value}</p>
            </Input>
        </>
    );
}

const Input = styledComponents.li`
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    span{
        margin-right: 2px;
        color: var(--date);
    }

    .value{
        color: ${({ inputType }) => inputType === "entrada" ? "var(--positive)" : "var(--negative)"};
    }
`

