import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [pic, setPic] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault()

    
    const formData = new FormData()
    console.log(formData)
    formData.append('testImage', pic)
    formData.append('name', name)

    axios.post('http://localhost:5000/',formData)
    .then(res => window.location.reload())
    .catch(err => console.log(err.message))
  }

  return (
    <div className="App">
      <h1>Image uploading react</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" required value={name} onChange={e => setName(e.target.value)} />
        <input type="file" name="testImage" required onChange={e =>setPic(e.target.files[0])} />
        <button type="submit">upload</button>
      </form>

      {data.map((singleData) => {

        console.log(singleData.img.data)
        var binary = '';
        var bytes = new Uint8Array( singleData.img.data.data );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }

        const base64String = window.btoa( binary );

        return <div>
          <p>{singleData.name}</p>
          <img src={`data:image/png;base64,${base64String}`} width="200"/>
        </div>
      })}
    </div>
  );
}

export default App;