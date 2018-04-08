let express = require('express');
let router = express.Router();
let controllers = require('./controllers');

/**
 * @swagger
 * /signup:
 *   post:
 *     description: Creates a new user
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: The user email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: The user password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The created user data
 *         schema:
 *           $ref: "#/definitions/NewUser"
 */
router.post('/signup', controllers.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     description: Log in with a users credentials
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: The user email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: The user password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: JWT token
 *         schema:
 *           $ref: "#/definitions/JWToken"
 */
router.post('/login', controllers.login);

/**
 * @swagger
 * /users/report:
 *   post:
 *     description: TBD
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: group
 *         description: TBD
 *         in: formData
 *         required: true
 *         type: string
 *       - name: subgroup
 *         description: TBD
 *         in: formData
 *         required: true
 *         type: string
 *       - name: option
 *         description: TBD
 *         in: formData
 *         required: true
 *         type: string
 *       - name: date
 *         description: TBD (UTC ISO date)
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: TBD
 */
router.post('/users/report', controllers.addReport);

/**
 * @swagger
 * /users/habits:
 *   post:
 *     description: TBD
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: TBD
 */
router.post('/users/habits', controllers.addHabits);

module.exports = router;