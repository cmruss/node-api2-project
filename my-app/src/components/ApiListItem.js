import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NestedList from './NestedList';
import styled from 'styled-components';

const StyledListItem = styled.div`
border: 1px solid whitesmoke;
width: 95%;
margin: 0 auto;
`
const initialState = {
    text:"",
}

const ApiListItem = props => {
    const [editing, setEditing] = useState(false);
    const [nestedList, setNestedList] = useState([]);
    const [response, setResponse] = useState(initialState);

    const { id, title, contents } = props.item;

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:4000/api/posts/${id}/comments`, response)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        setResponse({ text: ""});
    }

    useEffect(() => {
        axios
        .get(`http://localhost:4000/api/posts/${id}/comments`)
        .then(res => {
        console.log(res)
        setNestedList(res.data)
        })
        .catch(err => {
            console.log(err.response)
        });
  }, [setNestedList, setResponse, handleSubmit])

    const handleChange = e => {
        // e.persist();
        setResponse({
            ...response,
            text:e.target.value,
            post_id: `${id}`
        })
    }



    return(
        <StyledListItem className='list-item'>
            <div >
                <h2 >"{title}"</h2>
                <p onClick={()=>setEditing(!editing)}>{contents}</p>
                {!editing ? ( 
                    <span></span> 
                ) : ( 
                        <form>
                            <input
                                value={response.text}
                                onChange={handleChange}
                            />
                            <button onClick={handleSubmit}>submit</button>
                        </form>    
                    )}
                <NestedList nestedList={nestedList} setNestedList={setNestedList}/>
            </div>
        </StyledListItem>
    )
}
export default ApiListItem;