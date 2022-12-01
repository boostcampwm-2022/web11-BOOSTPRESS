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
export const Successbtn = styled.button`
    background: #328048;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background: #5cb176;
    }
`;

//z-index 정보
export const zIndex = {
    header: 10,
};

export const PlainBtn = styled.button`
    height: 48px;
    border-radius: 0px 12px 12px 0px;
    &:hover {
        background: #c5dcfa;
    }
`;
export const PrimaryBtn = styled.button`
    height: 48px;
    border-radius: 4px;
    background: #4945ff;
    color: white;
    &:hover {
        background: #7879ff;
    }
`;
