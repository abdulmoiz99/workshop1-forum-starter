import { useState, useEffect } from "react";
import "./App.scss";
import avatar from "./images/bozai.png";
import _ from "lodash";
import { Comments } from "./model/Comments";
import { v4 as guid } from "uuid";
import { CommentBody } from "./CommentBody";

const user = {
  uid: "30009257",
  avatar,
  uname: "John",
};

const App = () => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [activeTab, setActiveTab] = useState("Top");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const getList = async () => {
      const response = await fetch("http://localhost:3000/list");
      const data = await response.json();
      setComments(_.orderBy(data, "like", "desc"));
    };

    getList();
  }, []);

  const deleteComment = (commentId: string) => {
    setComments((comment) => comment.filter((c) => c.rpid !== commentId));
  };
  const sortList = (sortBy: String) => {
    let sortedComments;
    if (sortBy === "Top") {
      sortedComments = _.orderBy(comments, ["like"], ["desc"]);
    } else {
      sortedComments = _.orderBy(comments, ["ctime"], ["asc"]);
    }
    setComments(sortedComments);
  };

  const Post = () => {
    const newComment = new Comments(guid(), user, commentText);
    setComments([...comments, newComment]);
  };

  return (
    <div className="app">
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            <span className="total-reply">{comments.length}</span>
          </li>
          <li className="nav-sort">
            <span
              className={`nav-item ${activeTab === "Top" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("Top");
                sortList("Top");
              }}
            >
              Top
            </span>
            <span
              className={`nav-item ${activeTab === "Newest" ? "active" : ""}`}
              onClick={() => setActiveTab("Newest")}
            >
              Newest
            </span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="tell something..."
              value={commentText} // Controlled textarea
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="reply-box-send">
              <div className="send-text" onClick={() => Post()}>
                post
              </div>
            </div>
          </div>
        </div>
        <CommentBody comments={comments}  deleteComment ={deleteComment} />
      </div>
    </div>
  );
};

export default App;
