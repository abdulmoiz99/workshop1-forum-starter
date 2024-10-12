import { Comments } from "./model/Comments";

type PropsType = {
  comments: Comments[];
  deleteComment: any;
};

export const CommentBody = (props: PropsType) => {
  const {comments, deleteComment} = props

  return (
    <>
      <div className="reply-list">
        <div className="reply-item">
          <div className="root-reply-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" alt="" />
            </div>
          </div>
          <div className="content-wrap">
            {comments.map((comment) => {
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
                      <span
                        className="delete-btn"
                        onClick={() => deleteComment(comment.rpid)}
                      >
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
    </>
  );
};
