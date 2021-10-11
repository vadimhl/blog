const dummy = (blogs) => {
  return 1;
}
const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => {
    return sum+blog.likes;
  }, 0)
}

const favoriteBlog = (blogs) => {
  let result = {};
  let maxLikes = 0;
  blogs.forEach( blog => {
    if (blog.likes > maxLikes) {
      result = blog;
      maxLikes = blog.likes;
    }
  })
  return {
    author: result.author, 
    likes: result.likes,
    title: result.title
  };
}
const mostBlogs = (blogs) => {
  let result = {};
  let max = 0;
  const map = new Map();
  blogs.forEach( blog => {
    let cur = map.get(blog.author);
    cur = (cur? cur: 0)+1;
    map.set( blog.author, cur);
    if ( cur > max ) {
      max = cur;
      result = { author: blog.author, blogs: cur}
    }
  })
  return result;
}
const mostLikes = (blogs) => {
  let result = {};
  let max = 0;
  const map = new Map();
  blogs.forEach( blog => {
    let cur = map.get(blog.author);
    cur = (cur? cur: 0)+blog.likes;
    map.set( blog.author, cur);
    if ( cur > max ) {
      max = cur;
      result = { author: blog.author, likes: cur}
    }
  })
  return result;
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes  
}