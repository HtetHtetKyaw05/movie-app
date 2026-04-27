import { useState } from "react";

function FormTutorial() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    place: ""
  });

  const [list, setList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.place) return;

    setList([...list, form]);

    setForm({
      name: "",
      email: "",
      place: ""
    });
  };

  return (
    <div>
      <h2>入力フォーム</h2>

      {/* 入力フォーム（テーブル） */}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>名前</th>
              <td>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder = "名前"
                />
              </td>
            </tr>

            <tr>
              <th>Email</th>
              <td>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder = "xxx@gmail.com"
                />
              </td>
            </tr>

            <tr>
              <th>場所</th>
              <td>
                <input
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                  placeholder = "場所"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">追加</button>
      </form>

      <h2>一覧</h2>

      {/* 表示テーブル */}
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>名前</th>
            <th>Email</th>
            <th>場所</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td>{index +1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormTutorial;