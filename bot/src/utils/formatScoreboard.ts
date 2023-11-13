export const formatScoreboard = (userMap: Record<string, string | number>) => {
  const users = Object.entries(userMap).sort((a, b) => Number(b[1]) - Number(a[1]));
  return users
    .map(
      (user, index) =>
        `${index + 1}. <@${user[0]}> - ${user[1]} ${
          Number(user[1]) === 1 ? 'point' : 'points'
        }`
    )
    .join('\n');
};
