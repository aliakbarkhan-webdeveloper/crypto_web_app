



async function App() {
  let data;
  try {
    data= await fetch("http://localhost:4000/refresh");
  } catch (error) {
    return error
  }
  <>
  <h1>${data}</h1>
    </>
  }

export default App
