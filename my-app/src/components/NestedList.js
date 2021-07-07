import React, { useState } from 'react';
import NestedItem from './NestedItem';
import styled from 'styled-components';

const StyledNestedList = styled.div`
border: 1px solid whitesmoke;
background: grey;
width: 90%;
margin: 5% auto;
padding-bottom: 2%;
`

const NestedList = (props) => {

    return (
        <StyledNestedList className='nested-list'>
            {props.nestedList.length === 0 ? (
                <p>no comments</p>
            ) : (
                <p>comments</p>
            )}
            {props.nestedList.map(item => (
                <NestedItem key={item.id} item={item}/>
            ))}
        </StyledNestedList>
        
    )
};

export default NestedList; 