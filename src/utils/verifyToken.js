const jwt = require("jsonwebtoken");
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY, (err, decoded) => {
      if (decoded) resolve(decoded)
      else reject(err)
    })
  })
};
export default verifyToken;