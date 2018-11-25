import { getBaseURL } from './info'

// Basic POST fetch to help clean up the code
const postFetch = (url, postBody) => {
  fetch(url, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': postBody
  })
  .then((blob) => {
    return blob.json()
  })
  .then((data) => {
    console.log(data.content)
  })
}

const tieMediaToPost = (mediaID, postID, token) => {
  let url = getBaseURL() + 'api/post/tieMediaToPost'
  fetch(url, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'mediaID': mediaID,
      'postID': postID,
      'token': token
    })
  })
  .then((blob) => {
    return blob.json()
  })
  .then((data) => {
    console.log(data.content)
  })
}

export {postFetch, tieMediaToPost}