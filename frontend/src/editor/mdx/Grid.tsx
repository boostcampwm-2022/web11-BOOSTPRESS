import React from 'react';
import propTypes from 'prop-types';
import styled from '@emotion/styled';

const ActualGrid = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    & > * {
        flex: 1 0 200px;
        padding: 1rem;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    & img {
        width: 100%;
    }
`;

export const Grid = (children: any) => {
    return <ActualGrid>{children}</ActualGrid>;
};
