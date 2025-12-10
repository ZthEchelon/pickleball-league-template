export function calculateStandings(matches, players) {
  const standings = {};
  players.forEach(p => {
    standings[p.id] = { name: p.name, points: 0, games_played: 0, wins: 0 };
  });

  matches.forEach(match => {
    if (!match.scores || match.scores[0] == null || match.scores[1] == null) return;

    const t1Score = match.scores[0];
    const t2Score = match.scores[1];
    const t1Won = t1Score > t2Score;

    match.team_1.forEach(pid => {
      standings[pid].points += t1Score;
      standings[pid].games_played += 1;
      if (t1Won) standings[pid].wins += 1;
    });

    match.team_2.forEach(pid => {
      standings[pid].points += t2Score;
      standings[pid].games_played += 1;
      if (!t1Won) standings[pid].wins += 1;
    });
  });

  return Object.values(standings).sort((a, b) => b.points - a.points);
}
