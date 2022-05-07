// Creates the time stamps for the posts/comments here
module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    }
  };