import React, { useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

function ViewPost({createPost}) {
    const {id:key}=useParams();
    const {item}=useState();

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
                <div onClick={}>edit</div>
                <div onClick={}>delete</div>
            </div>
        </div>
    );
}
export default ViewPost;