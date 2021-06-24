const accountService = require("../services/account.service");

/**
 * @swagger
 * /account/register:
 *   post:
 *     summary: Create new account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: The account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 */
exports.register = async (req, res) =>
  res.status(201).json(await accountService.register(req.body));


/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: Login and response jwt token
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Un Authenticated
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const token = await accountService.login(username, password);
  if (!token) {
    res.status(401).json();
    return;
  }
  res.json({ token });
};



/**
 * @swagger
 * /account/info:
 *   get:
 *     summary: Returns info JWT
 *     tags: [Account]
 *     responses:
 *       200:
 *         description: The info JWT
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/InfoResponse'
 *       401:
 *         description: Un Authenticated
 *     security: [{ bearerAuth: [] }]
 */
exports.info = (req, res) => res.json({ username: req.sub, role: req.role });

/**
 * @swagger
 * tags:
 *    name: Account
 *    description: Account management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *        type: object
 *        required:
 *           - username
 *           - password
 *           - role
 *        properties:
 *            username:
 *              type: string
 *              description: The account username
 *            password:
 *              type: string
 *              description: The account password
 *            role:
 *              type: string
 *              description: The account role
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the account
 *         username:
 *           type: string
 *           description: The account username
 *         password:
 *           type: string
 *           description: The account password
 *         role:
 *           type: string
 *           description: The account role
 *         created_at:
 *           type: string
 *           description: The product created
 *         updated_at:
 *           type: string
 *           description: The product updated
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The account username
 *         password:
 *           type: string
 *           description: The account password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token
 *     InfoResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The account username
 *         role:
 *           type: string
 *           description: The account role
 *       example:
 *         username: iBlurBlur
 *         role: Admin
 */