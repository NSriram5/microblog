import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addCommentToAPI, deleteCommentFromAPI,  } from "./actionCreators";

function CommentComponent({id}){
    const dispatch = useDispatch();
    const blankForm = {comment:""};
    const [formData,setFormData] = useState(blankForm);
    const comments = useSelector(st=>st.detailPosts[id].comments,shallowEqual);
    
    const handleChange = (evt)=>{
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        dispatch(addCommentToAPI({key:id, text: formData.comment}));
        setFormData(blankForm);
    }
    return(
        <div>
            <h3>Comments</h3>
            {
                comments.map((comment)=>{
                    return(
                        <div key={comment.id}>
                            <i className="bi bi-x" style={{"color":"red"}} onClick={()=>dispatch(deleteCommentFromAPI({key:id,commentKey:comment.id}))}></i><span>{`     ${comment.text}`}</span>
                        </div>);
                    }
                )
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