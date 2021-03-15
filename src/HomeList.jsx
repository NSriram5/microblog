import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSummaryPostsFromAPI, voteWithAPI } from "./actionCreators";
import ViewPost from "./ViewPost";

function HomeList() {
    const dispatch = useDispatch();
    const posts = useSelector(st => st.summaryPosts, shallowEqual);

    useEffect(()=>{
        dispatch(fetchSummaryPostsFromAPI());
    },[dispatch]);

    

    posts.sort((postA,postB)=>postB.votes-postA.votes);
    return (
        <div className="pt-5">
            Welcome to <strong>Microblog</strong>, our innovative site for communicating on the information superhighway.
            <div className="row">
                {posts.map((post)=>{
                    return(
                    <div className="card col-3" key={post.id}>
                        <div className="card-body">
                            <Link to={{pathname:`/${post.id}`
                                    }}>
                            <div className="card-title">
                                {post.title}
                            </div>
                            </Link>
                            <div className="body">
                                {post.description}
                            </div>
                            <div>
                                {`${post.votes} votes`}
                                <i style={{color:"green"}} class="bi bi-hand-thumbs-up-fill" onClick={()=>dispatch(voteWithAPI({key:post.id,direction:"up"}))}></i>
                                <i style={{color:"red"}} class="bi bi-hand-thumbs-down-fill" onClick={()=>dispatch(voteWithAPI({key:post.id,direction:"down"}))}></i>
                            </div>
                        </div>
                    </div>

                )})}
            </div>

        </div>
    );
}
export default HomeList;