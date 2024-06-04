const jwt = require("jsonwebtoken");

const likeMiddle = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("backend here", token);
  

  if (!token) {
    return res.status(401).json({ error: "no token present" });
  }

  jwt.verify(token, process.env.JWT, (err, userid) => {
    if (err) {
      return res.status(401).json({ error: "wrong token present" });
    }
    console.log("userid.id : ",userid.id);
    console.log("userid :", userid)
    req.userid = userid.id;
    
    next();
  });
};

module.exports = {
  likeMiddle,
};
