const { db } = require('../model');
const User = db.User;
const bcrypt = require('bcryptjs');
/**
 * Middleware for Basic Authentication
 * Verifies user credentials from Authorization header
 * Expects header format: 'Basic base64(emailId:password)'
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const verifyBasicAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ error: 'Unauthorized: No credentials provided' });
    }

    // Decode Base64 credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [emailId, password] = credentials.split(':');

    try {
        // Find user by email
        const user = await User.findOne({ where: { emailId } });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        // Verify password
        const passwordMatches = bcrypt.compareSync(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Unauthorized: Invalid password' });
        }

        // Add user info to the request object
        req.user = user;
        next(); // Proceed to the next middleware or controller
    } catch (err) {
        console.error('Error in authentication:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = verifyBasicAuth;
