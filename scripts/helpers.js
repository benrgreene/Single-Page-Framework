// Return the data from a FETCH for all posts of a given type
export async function getPosts (type='post') {
  let response = await fetch(`${baseURL}api/get/posts/${type}`)
  let data     = await response.json()
  return data
}

// takes in a string and processes a specific shortcode in that string
//   content:   full string to process
//   shortcode: the shorcode tag
//   callback:  the function to call to get the shortcode's text
export function processShortcode (content, shortcode, callback) {
  while (content.includes(`[${shortcode}`)) {
    let pos     = content.indexOf(`[${shortcode}`)
    let openEnd = content.indexOf(`]`, pos)
    let endPos  = content.indexOf(`[/${shortcode}]`) + `[/${shortcode}]`.length
    // opening tag for the shortcode
    let openTag        = content.substring(pos, openEnd)
    let shortcodeParts = openTag.split(' ')
    let settings       = {} 
    // process each part of the shortcode
    shortcodeParts.forEach((part, index) => {
      let settingParts = part.split('=')
      settings[settingParts[0]] = settingParts[1]
    })
    let newContent = callback(settings)
    content = content.substring(0, pos) + newContent + content.substring(endPos)
  }
  return content
}