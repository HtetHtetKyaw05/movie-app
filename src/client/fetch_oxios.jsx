 import {useState, useEffect} from "react";

function App() {
 const [data, setData] = useState([]); // APIデータ用
 const [loading, setLoading] = useState(true); // 読み込み中用
 const [error, setError] = useState(null); // エラー管理用

 useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => {
        console.log("ログ出力テスト・・・・・・・・・・・");
        console.log("レスポンス：", res);
        if(!res.ok){
            throw new Error("Failed to fetch");
        }
        return res.json();
    })
    .then(data => {
        // 取得したデータをlogに出力
        console.log("データ取得：", data);

        setData(data);
        setLoading(false);
    })
    .catch(err => {
        // エラーをlogに出力
        console.log("エラー出力：", err);
        
        setError(err.message);
        setLoading(false);
    })
 }, []);

 // 画面に表示
 if(loading) return <p>Loading......</p>;
 if (error) return <p>Error: {error}</p>;
 return(
    <div>
        {data.map(item => (
            <p key = {item.id}>{item.title}</p>
        ))}
    </div>
 );
 }
 export default App;