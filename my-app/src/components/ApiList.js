import React, { useState } from 'react';
import ApiListItem from './ApiListItem';

const ApiList = (props) => {

    return (
        <div className='api-list'>
            {props.list.map(item => (
                <ApiListItem key={item.id} item={item}/>
            ))}
        </div>
    )
}
export default ApiList; 