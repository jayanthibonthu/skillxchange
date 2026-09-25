const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(
                token,
                "skill_exchange_secret"
            );

            req.user = {
                id: decoded.id
            };

            next();

        } else {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        });
    }
};

module.exports = { protect };