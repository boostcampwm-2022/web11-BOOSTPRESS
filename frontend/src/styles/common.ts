import styled from '@emotion/styled';

export const BasicInput = styled.input`
    background: #ffffff;
    border: 2px solid #e8e8e8;
    border-radius: 10px;
    cursor: pointer;
`;

export const BasicShadowBox = styled.div`
    background: #ffffff;
    box-shadow: 0px 1px 9px rgba(10, 31, 68, 0.1),
        0px 0px 1px rgba(10, 31, 68, 0.08), 0px 8px 10px rgba(10, 31, 68, 0.1);
    border-radius: 4px;
`;

export const PlainBtn = styled.button`
    background-color: transparent;
    border-width: 0;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    padding: 0;
    height: 48px;
    border-radius: 0px 12px 12px 0px;
    &:hover {
        background: #c5dcfa;
    }
`;
