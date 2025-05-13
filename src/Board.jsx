import React, { useState } from "react";

function Board() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.content.trim()) {
      alert("이름과 내용을 모두 입력해주세요.");
      return;
    }
    const newComment = {
      id: Date.now(),
      name: form.name,
      content: form.content,
      date: new Date().toLocaleString(),
      likes: 0,
    };
    setComments([newComment, ...comments]);
    setForm({ name: "", content: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
  };

  const handleEdit = (id, currentContent) => {
    setEditingId(id);
    setEditContent(currentContent);
  };

  const handleEditSave = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, content: editContent } : comment
      )
    );
    setEditingId(null);
    setEditContent("");
  };

  const handleLike = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>📬 방명록 / 게시판 ({comments.length}개)</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="text"
          name="content"
          placeholder="내용"
          value={form.content}
          onChange={handleChange}
          style={{ padding: "8px", marginRight: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>
          작성
        </button>
      </form>

      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            marginBottom: "15px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <strong>{comment.name}</strong>{" "}
          <span style={{ color: "gray", fontSize: "0.9em" }}>
            {comment.date}
          </span>
          {editingId === comment.id ? (
            <>
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                style={{ width: "100%", marginTop: "8px" }}
              />
              <div style={{ marginTop: "8px" }}>
                <button onClick={() => handleEditSave(comment.id)}>저장</button>
                <button
                  onClick={() => setEditingId(null)}
                  style={{ marginLeft: "10px" }}
                >
                  취소
                </button>
              </div>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button onClick={() => handleLike(comment.id)}>
                  ❤️ {comment.likes}
                </button>
                <button onClick={() => handleEdit(comment.id, comment.content)}>
                  수정
                </button>
                <button onClick={() => handleDelete(comment.id)}>삭제</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Board;
