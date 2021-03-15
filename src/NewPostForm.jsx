import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postPostToAPI } from "./actionCreators";

function NewPostForm({post}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const blankForm = {
        title:"",
        description:"",
        body:""
    }
    const [formData,setFormData] = useState(blankForm);
    const [errors,setErrors]=useState([]);

    const handleChange = evt => {
        const {name,value} = evt.target;
        setFormData(data=>({
            ...data,[name]:value
        }));
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
        dispatch(postPostToAPI({inputPost:formData}));
        history.push("/");
    }

    const handleCancel = (evt) => {
        history.push("/");
    }

    return (
        <div className="pt-5">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">New Post</h2>
                <div className="card">
                    <div className="card-body">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NewPostForm;