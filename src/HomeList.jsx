import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ViewPost from "./ViewPost";

function HomeList() {
    const posts = useSelector(st => st.posts);
    return (
        <div className="pt-5">
            Welcome to <strong>Microblog</strong>, our innovative site for communicating on the information superhighway.
            <div className="row">
                {Object.keys(posts).map((key)=>{
                    return(
                    <div className="card col-3" key={key}>
                        <div className="card-body">
                            <Link to={{pathname:`/${key}`,
                                    post:posts[key]
                                    }}>
                            <div className="card-title">
                                {posts[key].title}
                            </div>
                            </Link>
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