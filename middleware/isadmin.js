const TOKEN = process.env.TOKEN;
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const {token} = req.body;
        console.log(token);
        if (!token) {
            return res.status(403).json({message: "Enter token"});
        }
        let hasRole = false;
        if (token == TOKEN){
            hasRole = true;
        }
        if (!hasRole) {
            return res.status(403).json({message: "You don't have access"});

        }
        next();
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Enter token"});
    }
};
