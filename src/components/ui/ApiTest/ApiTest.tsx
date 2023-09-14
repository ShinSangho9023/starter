import React, {useState} from 'react';
import axios from "axios";


export default function ApiTest() {
    const [data, setData] = useState(null);
    async function onClick() {
      try {
        const response = await axios.get("/api/goal");
        setData(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
  
    return (
      <div>
        <div>
          <button onClick={onClick}>불러오기</button>
        </div>
        {data && (
          <textarea
            rows={7}
            value={JSON.stringify(data, null, 2)}
            readOnly={true}
          />
        )}
      </div>
    );
  }