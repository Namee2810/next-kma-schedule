const jwt = require("jsonwebtoken");
function authToken(token) {
  let data;
  jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY, (err, decoded) => {
    data = decoded;
  });
  return data;
};
export default authToken;