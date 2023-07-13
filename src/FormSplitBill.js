import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [yourExp, setYourExp] = useState("");
  const friendExp = bill ? bill - yourExp : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !yourExp) return;

    onSplitBill(whoIsPaying === "user" ? friendExp : -yourExp);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🕴 Your expense</label>
      <input
        type="text"
        value={yourExp}
        onChange={(e) =>
          setYourExp(
            Number(e.target.value) > bill ? yourExp : Number(e.target.value)
          )
        }
      />

      <label>👩🏻‍🤝‍🧑🏼 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={friendExp} />

      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
