import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";

function HomeList() {
    const posts = useSelector(st => st.posts);
    return (
        <div className="pt-5">
            Welcome to <strong>Microblog</strong>, our innovative site for communicating on the information superhighway.
            <div className="row">
                {Object.keys(posts).map((key)=>{
                    return(
                    <div className="card col-3">
                        <div className="card-body">
                            <NavLink to={{pathname:`/${key}`,state:{item:posts[key],key:key}}}>
                            <div className="card-title">
                                {posts[key].title}
                            </div>
                            </NavLink>
                            <div className="body">
                                {posts[key].description}
                            </div>
                        </div>
                    </div>

                )})}
            </div>

        </div>
    );
}
export default HomeList;