import styled from 'styled-components';

export const StyledForm = styled.form`
    max-width: 350px;
    width: 100%;
    margin: 2rem auto;

    h2{
        margin-bottom: 1rem;
        text-align: center;
    }

    button, input {
        height: 35px;
        width:100%;
        padding: 7px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(220,220,220);
        margin-bottom: 1rem;

        &:focus{
            border: 1px solid rgb(0,208,255)
        }
    }

    button {
        cursor: pointer;
        background: linear-gradient(to bottom right, rgb(133,39,59), rgba(189,56,84,1) 35%);
        border: 0;
        border-radius: 12px;
        color: #FFFFFF;
        &:focus{
            border: none;
        }
    }

    p {
        font-size: 14px;
        color: red;
        text-align: center;
    }
`;
// const StyledForm = () => {
//     return ()
// }

// export default StyledForm;