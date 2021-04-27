import Board from './components/Board';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <main className="flexbox">
        <Board id="board-1" className="board">
          <Card id="card-1" classname="card" draggable="true">
            <p>Card one</p>
          </Card>
        </Board>
        <Board id="board-2" className="board">
          <Card id="card-2" classname="card" draggable="true">
            <p>Card two</p>
          </Card>
        </Board>
      </main>
    </div>
  );
}

export default App;
