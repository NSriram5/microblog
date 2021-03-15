import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import CommentsComponent from "./CommentsComponent";
import { fetchSpecificPostFromAPI, updatePostToAPI , deletePostFromAPI, voteWithAPI} from "./actionCreators";

function ViewPost(props) {
    const {id:key}=useParams();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [blankForm, setBlankForm] = useState({
        title:"",
        description:"",
        body:""
    })
    const post = useSelector(st=> st.detailPosts[key],shallowEqual);
    
    useEffect(()=>{
        dispatch(fetchSpecificPostFromAPI({id:key}));
    },[dispatch])

    useEffect(()=>{
        if (post) {
            setBlankForm({
                title:post.title,
                description:post.description,
                body:post.body
            });
            setComments(post.comments);
            setLoading(false);
        }
    },[post])

    
    const [formData,setFormData] = useState(blankForm);
    const [errors,setErrors]=useState([]);
    
    useEffect(()=>{
        setFormData(blankForm);    
    },[blankForm])

    const handleDelete = () =>{
        dispatch(deletePostFromAPI({key:key}));
        history.push("/");
    }

    const handleEdit = () =>{
        setEditMode(true);
    }

    function printErrors(){
        if (errors.length!==0){
            return(
                <div className="alert alert-danger" role="alert">
                    {errors.map((err,index)=>{return(
                        <p key={index} className="mb-0 small">{err}</p>
                        )
                    })}
                </div>
            )
        } else {
            return(null);
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrors([]);
        dispatch(updatePostToAPI({inputPost:{...formData,id:key}}))
        setEditMode(false);
    }

    const handleChange = evt => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    const renderView = () =>{
        if (loading){
            return(
                <h1>Loading</h1>
            );
        }
        if (editMode){
            return(
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input name="title" className="form-control" value={formData["title"]} onChange={handleChange} autoComplete="title"/>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input name="description" className="form-control" value={formData["description"]} onChange={handleChange} autoComplete="description"/>
                    </div>
                    <div className="form-group">
                        <label>Body:</label>
                        <input name="body" className="form-control" value={formData["body"]} onChange={handleChange} autoComplete="body"/>
                    </div>
                    {printErrors()}
                    <button type="submit" className="btn btn-primary float-right">Save</button>
                    <button type="cancel" className="btn btn-primary float-right">Cancel</button>
                </form>
            )
        } else {
            return (
                <div className="">
                    <h1>
                        {post.title}
                    </h1>
                    <h4>
                        {post.description}
                    </h4>
                    <p>
                        {post.body}
                    </p>
                    <div className="position-absolute" style={{"top":"0px","right":"0px"}}>
                        <div>
                            <div className="d-inline" onClick={handleEdit}>
                                <i className="bi bi-pencil-square"></i>
                            </div>
                            <div className="d-inline" onClick={handleDelete} style={{"color":"red"}}>
                                <i className="bi bi-x"></i>
                            </div>
                        </div>
                        <div>
                            {`${post.votes} votes`}
                            <i style={{color:"green"}} class="bi bi-hand-thumbs-up-fill" onClick={()=>dispatch(voteWithAPI({key:post.id,direction:"up"}))}></i>
                            <i style={{color:"red"}} class="bi bi-hand-thumbs-down-fill" onClick={()=>dispatch(voteWithAPI({key:post.id,direction:"down"}))}></i>
                        </div>

                    </div>
                </div>
            )
        }
    }

    const renderCommentView = () =>{
        if (loading){
            return(
                <h1>Loading</h1>
            );
        }
        return (
            <CommentsComponent id={key} comments={comments} setComments={setComments}/>
        )
    }
    return (
        <div className="pt-5">
            <div className="container position-relative col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                {renderView()}
            </div>
            <div>
                {renderCommentView()}
            </div>
        </div>
    );
}
export default ViewPost;