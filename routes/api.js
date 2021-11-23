const express = require('express');
const router = express.Router();
const urllib = require('urllib');

const teamToIDs = {
  lakers: '1610612747',
  warriors: '1610612744',
  heat: '1610612748',
  suns: '1610612756',
};

router.get('/teams/:teamName', function (request, response) {
  const teamName = request.params.teamName;
  const teamID = teamToIDs[teamName];

  urllib.request(
    'http://data.nba.net/10s/prod/v1/2018/players.json',
    function (err, req, res) {
      const teamData = req.toString();
      const teamDataParsed = JSON.parse(teamData);

      const activePlayers = (t) => t.teamId === teamID && t.isActive === true;

      let allActivePlayers =
        teamDataParsed.league.standard.filter(activePlayers);
      const activePlayersInfo = allActivePlayers.map((player) => {
        return {
          firstName: player.firstName,
          lastName: player.lastName,
          jersey: player.jersey,
          position: player.pos,
          picture: `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`,
        };
      });
      response.send(activePlayersInfo);
    }
  );
});

module.exports = router;
