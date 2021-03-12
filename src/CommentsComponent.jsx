import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {v4 as uuidv4} from 'uuid';

function CommentComponent({id,comments,setComments}){
    const dispatch = useDispatch();
    const blankForm = {comment:""};
    const [formData,setFormData] = useState(blankForm);
    
    const handleChange = (evt)=>{
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        const commentId = uuidv4();
        dispatch({type:"ADD_COMMENT",id,commentId:uuidv4(),comment:formData})
        setComments({[commentId]:{comment:formData.comment},...comments});
        setFormData(blankForm);
    }
    const handleDelete = (key)=>{
        dispatch({type:"DELETE_COMMENT",id,key})
        const {[key]:a,...rest} = comments;
        setComments(rest);
    }
    return(
        <div>
            <h3>Comments</h3>
            {
                Object.keys(comments).map((key)=>{
                    if (comments[key]){
                        return(
                            <div key={key}>
                                <i className="bi bi-x" style={{"color":"red"}} onClick={()=>handleDelete(key)}></i><span>{`     ${comments[key].comment}`}</span>
                            </div>);
                    }
                    return null;
                })

            }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" name="comment" value={formData["comment"]} onChange={handleChange} autoComplete="comment"/>
                    <button type="submit" className="btn btn-primary float-right">Add</button>
                </div>
            </form>
        </div>
    );
}

export default CommentComponent;