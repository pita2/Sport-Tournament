const Router = require('express');
const router = new Router;
const PlayerController = require('../controller/PlayerControllerr');
const isadmin = require('../middleware/isadmin');
const login = require('../middleware/login');

router.post('/log', login, PlayerController.addplayer);
router.get('/player', PlayerController.getplayer);
router.get('/players/:id', PlayerController.getoneplayer);
router.delete('/player/:id', PlayerController.removeplayer_from_player);


module.exports = router;