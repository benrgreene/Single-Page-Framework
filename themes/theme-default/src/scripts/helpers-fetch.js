/**
 * THESE ARE FETCH HELPER FUNCTIONS FOR THE THEME
 * add other helpers to a different file
 */

// Get a post object by its slug
const fetchPostBySlug = async (slug) => {
  let response = await fetch(`${window.theme.baseURL}api/get/post/${slug}`)
  let data     = await response.json()
  return data.content
}

export { fetchPostBySlug }