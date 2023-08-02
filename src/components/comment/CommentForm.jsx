import { useState } from "react";
import './style.css';

export function CommentForm({
  loading,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [comment, setComment] = useState(initialValue)
  const [error, setError] = useState();

  function handleSubmit(e) {
    e.preventDefault()
    if(comment === "" || comment == null) {
      setError("Comment message is require");
      return;
    }
    onSubmit(comment).then(() => {
      setComment("")
      setError("")
    })
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="comment-form-row">
            <textarea
                autoFocus={autoFocus}
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="message-input"
            />
            
            <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {loading ? "Loading" : "Post"}
            </button>
        </div>
       
        <div className="error-msg">{error}</div>
    </form>
  )
}
