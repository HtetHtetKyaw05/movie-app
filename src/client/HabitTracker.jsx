import { useState, useEffect } from "react";

function HabitTracker() {
  // habitsをlocalStorageから読み込む
  // useState（状態管理よう）
  // habits習慣リスト
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  // useState
  // 入力用
  const [input, setInput] = useState("");

  // habits変更時に保存
  // useEffect（副作用）
  // habitsが変わるたびにlocalStorageに保存
  // localStorageは文字列しか保存できないため、JSONを使う。配列やオブジェクトはそのまま保存できない
  useEffect(() => {
    // localStroage（ブラウザ保存）、リロードしても残る
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // 今日の日付取得（ストリーク用）
  const today = new Date().toISOString().split("T")[0];

  // 習慣追加
  const addHabit = () => {
    if (!input.trim()) return;

    setHabits([
      ...habits,
      {
        id: Date.now(), // 一意ID
        text: input, // 入力値 
        completedDates: [], // 完了した日付リスト
        streak: 0 // 連続日数
      }
    ]);

    setInput("");
  };

  // 完了チェック（ストリーク更新）
  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.completedDates.includes(today);

        let newDates;
        let newStreak = habit.streak;

        if (alreadyDone) {
          // 取り消し
          newDates = habit.completedDates.filter((d) => d !== today);
          newStreak = Math.max(0, habit.streak - 1);
        } else {
          // 完了
          newDates = [...habit.completedDates, today];
          newStreak = habit.streak + 1;
        }

        return {
          ...habit,
          completedDates: newDates,
          streak: newStreak
        };
      })
    );
  };

  // 削除
  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Habit Tracker</h1>

      {/* 入力エリア */}
      <div style={styles.inputArea}>
        <input
          value={input}
          //イベントハンドリング 
          onChange={(e) => setInput(e.target.value)}
          placeholder="習慣を入力"
          style={styles.input}
        />
        <button onClick={addHabit} style={styles.button}>
          追加
        </button>
      </div>

      {/* 一覧表示 */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>習慣</th>
            <th>今日</th>
            <th>ストリーク</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {habits.map((habit) => {
            const doneToday = habit.completedDates.includes(today);

            return (
              <tr key={habit.id}>
                <td style={styles.td}>{habit.text}</td>

                {/* 完了チェック */}
                <td style={styles.td}>
                  <input
                    type="checkbox"
                    checked={doneToday}
                    // イベントハンドリング
                    onChange={() => toggleHabit(habit.id)}
                  />
                </td>

                {/* ストリーク表示 */}
                <td style={styles.td}>{habit.streak}日</td>

                {/* 削除 */}
                <td style={styles.td}>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    style={styles.deleteBtn}
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// UIスタイル
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  inputArea: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    flex: 1,
    padding: "8px"
  },
  button: {
    padding: "8px 12px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  }
};

export default HabitTracker;