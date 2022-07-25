const Router = require('express');
const router = new Router;
const TournamentController = require('../controller/TournamentController');
const isadmin = require('../middleware/isadmin');
const for_add_user = require('../middleware/for_add_user');

router.post('/tournaments', isadmin, TournamentController.createtournament);
router.put('/tournaments/tournament/update/:id', isadmin, TournamentController.updatetournament);
router.delete('/tournaments/tournament/remove/:id', isadmin, TournamentController.removetournament);
router.delete('/tournaments/tournament/player/:id', TournamentController.removeplayer_from_tournament);
router.post('/tournaments/tournament/:id', for_add_user, TournamentController.addplayer_to_tournament);
router.get('/tournaments/period', TournamentController.tournaments_for_the_period);
router.get('/tournaments/recent', TournamentController.upcoming_tournaments);


module.exports = router;