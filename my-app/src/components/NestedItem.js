import React from 'react';
import styled from 'styled-components';

const StyledNestedItem = styled.div`
border: 1px solid whitesmoke;
width: 95%;
margin: 0 auto;
`

const NestedItem = props => {
    const { text } = props.item;

    return (
        <StyledNestedItem className='nested-item'>
            <p>{text}</p>
        </StyledNestedItem>
    )
}

export default NestedItem;