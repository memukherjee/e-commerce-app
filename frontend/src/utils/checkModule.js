export const moduleBasedOnPath = (path, User, Seller, Admin) => {
  const sellerRegex = /^\/seller.*$/;
  const adminRegex = /^\/admin.*$/;
  if (path.match(sellerRegex)) {
    return Seller;
  } else if (path.match(adminRegex)) {
    return Admin;
  } else {
    return User;
  }
};
