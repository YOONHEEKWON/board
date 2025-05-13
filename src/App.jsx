import "./App.css";
import Board from "./board";
function App() {
  return (
    <div>
      {/* 기존 자기소개 영역 */}
      <h1>안녕하세요!</h1>
      {/* ...생략... */}

      {/* 게시판 추가 */}
      <Board />
    </div>
  );
}

export default App;
