// format text preview
export const truncateText = (text: string, length: number = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

// calculate pagination skip value
export const calculateSkip = (page: number, limit: number) => {
  return (page - 1) * limit;
};

// check if user owns post
export const isOwner = (postUserId: number, currentUserId: number) => {
  return postUserId === currentUserId;
};