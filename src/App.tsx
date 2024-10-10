import { useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png'

// current logged in user info
const user = {
  // userid
  uid: '30009257',
  // profile
  avatar,
  // username
  uname: 'John',
}

// Nav Tab
const tabs = [
  { type: 'hot', text: 'Top' },
  { type: 'newest', text: 'Newest' },
]

const App = () => {
  const [comments, setComments] = useState([
    {
      // comment id
      rpid: 3,
      // user info
      user: {
        uid: '13258165',
        avatar: '',
        uname: 'Jay Zhou',
      },
      // comment content
      content: 'Nice, well done',
      // created datetime
      ctime: '10-18 08:15',
      like: 88,
    },
    {
      rpid: 2,
      user: {
        uid: '36080105',
        avatar: '',
        uname: 'Song Xu',
      },
      content: 'I search for you thousands of times, from dawn till dusk.',
      ctime: '11-13 11:29',
      like: 88,
    },
    {
      rpid: 1,
      user: {
        uid: '30009257',
        avatar,
        uname: 'John',
      },
      content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
      ctime: '10-19 09:00',
      like: 66,
    },
  ])

  const deleteComment = (commentId: Number) => {
    setComments(comment => comment.filter(c => c.rpid !== commentId));
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
            <span className='nav-item'>Top</span>
            <span className='nav-item'>Newest</span>
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
              <div className="send-text">post</div>
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