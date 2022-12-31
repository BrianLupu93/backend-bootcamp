const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // On client also delete the access Token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content to send back
  const refreshToken = cookies.jwt;

  // is refresh Token in DB?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true }, { maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  // Delete refreshToken in DB

  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true }, { maxAge: 24 * 60 * 60 * 1000 }); // secure: true -- serve only for https
  res.sendStatus(204);
};

module.exports = { handleLogout };
