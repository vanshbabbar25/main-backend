const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

const fetchAlumini = (req, res, next) => {
    // Extract token from header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "No token, authorization denied" });
    }

    try {
        // Verify token and extract Alumini data
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decoded); 
        req.Alumini = decoded.Alumini;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error.message); 
        res.status(401).send({ error: "Invalid token" });
    }
};

module.exports = fetchAlumini;