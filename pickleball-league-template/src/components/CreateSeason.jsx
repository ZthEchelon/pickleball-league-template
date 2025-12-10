import { useState } from "react";
import { saveLeagueData } from "../services/db";

export default function CreateSeason() {
  const [seasonName, setSeasonName] = useState("");
  const [numWeeks, setNumWeeks] = useState(1);

  const [players, setPlayers] = useState([]);
  const [playerInput, setPlayerInput] = useState("");

  const addPlayer = () => {
    if (!playerInput.trim()) return;
    setPlayers([...players, playerInput.trim()]);
    setPlayerInput("");
  };

  const generateSeasonStructure = () => {
    const weeks = [];

    for (let w = 1; w <= numWeeks; w++) {
      weeks.push({
        week_number: w,
        date: null,
        groups: []
      });
    }

    return {
      season_id: seasonName.toLowerCase().replace(/\s+/g, "_"),
      players: players.map((name, index) => ({
        id: "p" + (index + 1),
        name
      })),
      weeks
    };
  };

  const handleSave = async () => {
    const newSeason = generateSeasonStructure();
    await saveLeagueData(newSeason, null);
    alert("Season created!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Season</h1>

      <label className="block mb-2">Season Name</label>
      <input
        className="border p-2 mb-4 w-full"
        value={seasonName}
        onChange={(e) => setSeasonName(e.target.value)}
        placeholder="Winter 2025"
      />

      <label className="block mb-2">Number of Weeks</label>
      <input
        type="number"
        className="border p-2 mb-4 w-full"
        value={numWeeks}
        onChange={(e) => setNumWeeks(Number(e.target.value))}
      />

      <h2 className="text-xl font-semibold mb-2">Players</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={playerInput}
          onChange={(e) => setPlayerInput(e.target.value)}
          placeholder="Enter player name"
        />
        <button className="bg-green-500 text-white px-4" onClick={addPlayer}>
          Add
        </button>
      </div>

      <ul className="mb-4">
        {players.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Season
      </button>
    </div>
  );
}
