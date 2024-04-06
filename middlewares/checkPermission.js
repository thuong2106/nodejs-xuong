import { errorMessages } from "../constants/message.js";

export const checkPrermission = (roles) => (req, res, next) => {
  const hashPermission = roles.some((role) => req.user.roles.includes(role));
  if (!hashPermission) {
    return res.status(403).json({ message: errorMessages.PERMISSION_DENIED });
  }
  next();
};
