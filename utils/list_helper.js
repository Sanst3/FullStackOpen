// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  const total = blogs.reduce((cur, blog) => blog.likes + cur, 0)
  return total
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const result = blogs.reduce((cur, blog) => {
    return (blog.likes > cur.likes) ? blog : cur
  })

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}