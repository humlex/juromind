export const App = (): JSX.Element => {
  const getResponse = async () => {
    const response = await fetch('http://localhost:8000/api/hello/');
    const message = await response.json();

    alert(message);
  };

  return (
    <div>
      <div>hello</div>
      <button onClick={getResponse}>fetch</button>
    </div>
  );
}

export default App;
