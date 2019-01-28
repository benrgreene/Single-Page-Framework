// Return the data from a FETCH for all posts of a given type
export async function getPosts (type='post') {
  let response = await fetch(`${baseURL}api/get/posts/${type}`)
  let data     = await response.json()
  return data
}