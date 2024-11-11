const users = [{ user: "user", pass: "pass", role: "admin", token: "user" }];

export function verifyUser(user, pass) {
  const userFound = user.find((u) => {
    return u.user === user0 && u.pass === pass;
  });

  return userFound ? { role: userFound.role, token: userFound.token } : null;
}
