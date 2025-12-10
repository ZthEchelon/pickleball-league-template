// src/components/MatchCard.jsx
import React from "react";

export default function MatchCard({ match, players, onScoreUpdate }) {
  const getName = (id) => players.find(p => p.id === id)?.name || id;

  const handleChange = (teamIndex, e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    onScoreUpdate(match.match_id, teamIndex, value);
  };

  return (
    <div className="border rounded-lg p-4 shadow mb-4 bg-white">
      <div className="flex justify-between mb-2">
        <span className="font-bold">Match {match.match_id}</span>
        {match.scores[0] != null && match.scores[1] != null && (
          <span className="text-green-600 text-sm">✓ Final</span>
        )}
      </div>

      {/* Team 1 */}
      <div className="flex justify-between mb-2 items-center">
        <div>{getName(match.team_1[0])} & {getName(match.team_1[1])}</div>
        <input
          type="number"
          value={match.scores[0] ?? ""}
          onChange={(e) => handleChange(0, e)}
          className="border p-1 w-16 text-center rounded"
        />
      </div>

      {/* Team 2 */}
      <div className="flex justify-between items-center">
        <div>{getName(match.team_2[0])} & {getName(match.team_2[1])}</div>
        <input
          type="number"
          value={match.scores[1] ?? ""}
          onChange={(e) => handleChange(1, e)}
          className="border p-1 w-16 text-center rounded"
        />
      </div>
    </div>
  );
}
