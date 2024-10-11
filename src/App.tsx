import { useRef, useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png';
import _ from 'lodash';
import { Comments } from './model/Comments';
import { v4 as guid } from 'uuid';

const user = {
  uid: '30009257',
  avatar,
  uname: 'John',
}

const App = () => {
  const [comments, setComments] = useState<Comments[]>([])
  const [activeTab, setActiveTab] = useState("Top")
  const inputRef = useRef<HTMLInputElement>(null);

  const deleteComment = (commentId: string) => {
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

  const Post = () => {
    if (inputRef.current?.value) {
      const newComment = new Comments(
        guid(),
        user,
        inputRef.current.value,
      );
      setComments([...comments, newComment])
      inputRef.current.value = ''
    }
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
            <input
              ref={inputRef}
              type="text"
              className="reply-box-textarea"
              placeholder="tell something..."
            />
            <div className="reply-box-send">
              <div className="send-text" onClick={() => Post()}>post</div>
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