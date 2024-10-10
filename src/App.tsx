import { useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png';
import _ from 'lodash';
import { Comments } from './model/Comments';


// current logged in user info
const user = {
  // userid
  uid: '30009257',
  // profile
  avatar,
  // username
  uname: 'John',
}


const App = () => {
  let commentId = 1;
  const [comments, setComments] = useState<Comments[]>([])
  const [activeTab, setActiveTab] = useState("Top")

  const deleteComment = (commentId: Number) => {
    setComments(comment => comment.filter(c => c.rpid !== commentId));
  }
  const sortList = (sortBy: String) => {
    let sortedComments;
    if (sortBy === "Top") {
      sortedComments = _.orderBy(comments, ['like'], ['desc']);

    }
    else {
      sortedComments = _.orderBy(comments, ['ctime'], ['asc']);
    }
    setComments(sortedComments)
  }

  const Post = (commentText: string) => {
    const newComment = new Comments(
      commentId++,
      user,
      commentText,
    );
    setComments([...comments, newComment])
  }

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
              className={`nav-item ${activeTab === 'Top' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab("Top");
                sortList("Top");
              }}
            >
              Top
            </span>
            <span
              className={`nav-item ${activeTab === 'Newest' ? 'active' : ''}`}
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
            />
            <div className="reply-box-send">
              <div className="send-text" onClick={() => Post("Post this message")}>post</div>
            </div>
          </div>
        </div>
        <div className="reply-list">
          <div className="reply-item">
            <div className="root-reply-avatar">
              <div className="bili-avatar">
                <img
                  className="bili-avatar-img"
                  alt=""
                />
              </div>
            </div>

            <div className="content-wrap">

              {comments.map(comment => {
                return (
                  <>
                    <div className="user-info">
                      <div className="user-name">{comment.user.uname}</div>
                    </div>

                    <div className="root-reply">
                      <span className="reply-content">{comment.content}</span>
                      <div className="reply-info">
                        <span className="reply-time">{comment.ctime}</span>
                        <span className="reply-time">Like:{comment.like}</span>
                        <span className="delete-btn" onClick={() => deleteComment(comment.rpid)}>
                          Delete
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App