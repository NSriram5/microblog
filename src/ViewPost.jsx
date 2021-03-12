import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function ViewPost(props) {
    const {id:key}=useParams();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [item, setItem] = useState(location.post);
    const [editMode, setEditMode] = useState(false);
    
    const blankForm = {
        title:item.title,
        description:item.description,
        body:item.body
    }
    const [formData,setFormData] = useState(blankForm);
    const [errors,setErrors]=useState([]);


    const handleDelete = () =>{
        dispatch({type:"REMOVE",id:key})
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
        dispatch({type:"EDIT",id:key ,post:formData});
        setItem(formData)
        setEditMode(false);
    }

    const handleChange = evt => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
    }

    const renderView = () =>{
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
                <>
                <h1>
                    {item.title}
                </h1>
                <h4>
                    {item.description}
                </h4>
                <p>
                    {item.body}
                </p>
                <div onClick={handleEdit}>edit</div>
                <div onClick={handleDelete}>delete</div>
                </>
            )
        }
    }
    return (
        <div className="pt-5">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                {renderView()}
            </div>
        </div>
    );
}
export default ViewPost;