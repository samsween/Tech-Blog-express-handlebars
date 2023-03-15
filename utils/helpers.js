module.exports = {
  formatDate: function (date) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  },
  isLiked: function (likes, user_id, options) {
    console.log(likes);
    if (likes) {
      console.log(user_id);
      const liked = likes.find((like) => like.user_id === user_id);
      if (liked) {
        return options.fn(this);
      }
    }
    return options.inverse(this);
  },
  getLikeId: function (likes, user_id) {
    if (likes) {
      const liked = likes.find((like) => like.user_id === user_id);
      if (liked) {
        return liked.id;
      }
    }
    return null;
  },
};
