/**
 * THESE ARE FETCH HELPER FUNCTIONS FOR THE THEME
 * add other helpers to a different file
 */

// Get a post object by its slug
const fetchPostBySlug = async (slug) => {
  let response = await fetch(`${baseURL}api/get/post/${slug}`)
  let data     = await response.json()
  return data.content
}

const fetchFeatureImage = async (postID) => {
  let response = await fetch(`${baseURL}api/get/media/${postID}`)
  let data     = await response.json()
  return data.content
}

export { fetchPostBySlug, fetchFeatureImage }