export const formatDate = (date: Date) => {
  const dd = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
  const mm = date.getMonth() > 9 ? `${date.getMonth()}` : `0${date.getMonth()}`;
  return `${dd}.${mm}.${date.getFullYear()}`;
};
