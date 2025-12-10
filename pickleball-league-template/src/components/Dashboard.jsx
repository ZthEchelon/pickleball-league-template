// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import WeekTabs from "./WeekTabs";
import GroupTabs from "./GroupTabs";
import MatchCard from "./MatchCard";
import { getLeagueData, saveLeagueData } from "../services/db";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [season, setSeason] = useState(null);
  const [sha, setSha] = useState(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, sha } = await getLeagueData();
      setSeason(data);
      setSha(sha);
    };
    fetchData();
  }, []);

  if (!season) return <p>Loading...</p>;

  const week = season.weeks[activeWeek];
  const group = week.groups[activeGroup];

  // Update scores
  const handleScoreUpdate = (matchId, teamIndex, value) => {
    const updated = { ...season };
    updated.weeks[activeWeek].groups[activeGroup].matches =
      updated.weeks[activeWeek].groups[activeGroup].matches.map(m =>
        m.match_id === matchId
          ? { ...m, scores: m.scores.map((s, i) => (i === teamIndex ? Number(value) : s)) }
          : m
      );
    setSeason(updated);
  };

  const handleSave = async () => {
    if (!season || !sha) return;
    try {
      await saveLeagueData(season, sha);
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save scores.");
    }
  };

  // Calculate standings for current group
  const calculateStandings = (matches, players) => {
    const standings = {};
    players.forEach(p => { standings[p.id] = { name: p.name, points: 0, wins: 0 }; });

    matches.forEach(match => {
      if (match.scores[0] != null && match.scores[1] != null) {
        const t1Won = match.scores[0] > match.scores[1];

        match.team_1.forEach(pid => {
          standings[pid].points += match.scores[0];
          if (t1Won) standings[pid].wins += 1;
        });

        match.team_2.forEach(pid => {
          standings[pid].points += match.scores[1];
          if (!t1Won) standings[pid].wins += 1;
        });
      }
    });

    return Object.values(standings).sort((a, b) => b.points - a.points);
  };

  const standings = calculateStandings(group.matches, season.players);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-pickle-green">
        Pickleball League Dashboard
      </h1>

      <Link to="/create" className="underline text-blue-600 mb-4 block">
        Create New Season
      </Link>

      {/* Week Tabs */}
      <WeekTabs
        weeks={season.weeks}
        activeWeek={activeWeek}
        onChange={i => { setActiveWeek(i); setActiveGroup(0); }}
      />

      {/* Group Tabs */}
      <GroupTabs
        groups={week.groups}
        activeGroup={activeGroup}
        onChange={setActiveGroup}
      />

      <button
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded"
        onClick={handleSave}
      >
        Save Changes
      </button>

      {/* Match Cards */}
      {group.matches.map(match => (
        <MatchCard
          key={match.match_id}
          match={match}
          players={season.players}
          onScoreUpdate={handleScoreUpdate}
        />
      ))}

      {/* Standings */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Standings</h2>
        <ul>
          {standings.map(p => (
            <li key={p.name}>
              {p.name}: {p.points} pts, {p.wins} wins
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
