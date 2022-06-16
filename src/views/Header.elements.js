import styled from "styled-components";

export const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 800px) {
        diplay: flex;
        align-items: center;
        cursor: pointer;

        svg {
            fill: #009e45;
            margin-right: 0.5rem;
        }
    }
`;
