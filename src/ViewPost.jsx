import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function ViewPost(props) {
    const {id:key}=useParams();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const item=location.post;

    const handleDelete = () =>{
        dispatch({type:"REMOVE",id:key})
        history.push("/");
    }

    debugger;
    return (
        <div className="pt-5">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h1>
                    {item.title}
                </h1>
                <h4>
                    {item.description}
                </h4>
                <p>
                    {item.body}
                </p>
                <div onClick={()=>0}>edit</div>
                <div onClick={handleDelete}>delete</div>
            </div>
        </div>
    );
}
export default ViewPost;