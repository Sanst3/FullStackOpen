import './App.css';

function Test(props) {
  return (
    <div>
      <p>This is from test: arg1={props.arg1}, arg2={props.arg2}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <p>This is part of app</p>
      <Test arg1="test1" arg2="test2"/>
      <Test arg1="test3" arg2="test4"/>
      <Test />
    </div>
  );
}

export default App;
