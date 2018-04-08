let express = require('express');
let router = express.Router();
let controllers = require('./controllers');

/**
 * @swagger
 * /api/signup:
 *   post:
 *     description: Creates a new user for the given data
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The created user data
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
router.post('/signup', controllers.signup);
router.post('/login', controllers.login);
router.post('/users/report', controllers.addReport);
router.post('/users/habits', controllers.addHabits);

module.exports = router;