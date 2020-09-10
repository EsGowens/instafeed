const acessToken = "IGQVJYcl93ajZABNlhzdnNfN0pndWdCT2Vybk1ETFNwRDQyd0ZAWOE9jcFZAtcVo5bVViWDVPRERtNEpIV1hkYVExY2thYUJrLWdFeDAzOVk1SjVBcVBKOG1nQWVQbklyNVpLeE9fNkNfM2g1eEFoTEs2QQZDZD"
const fields = "id,media_type,media_url,timestamp,permalink"
const section = document.querySelector("section")

const refreshAccessToken = async () => {
    const superhiApi = `https://api.superhi.com/api/test/token/instagram?access_token=${acessToken}`
    const response = await fetch(superhiApi)
    const {access_token} = await response.json()
    return access_token
}

const fetchPosts = async () => {

try {
const newToken = await refreshAccessToken()
const apiUrl = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${newToken}`

 const response = await fetch(apiUrl)
 const {data} = await response.json()

 section.innerHTML = ""
 data.forEach(post => {
     let a = document.createElement("a")
     a.href = post.permalink
     a.target = "_blank"
     a.rel = "noreferrer noopener"
    if (post.media_type === "VIDEO") {
        let video = document.createElement("video")
        video.src = post.media_url
        video.preload = true
        video.autoplay = true
        video.muted = true
        video.loop = true
        a.appendChild(video)
    } else {
     let img = document.createElement("img")
     img.src = post.media_url
     a.appendChild(img) 
    }
    section.appendChild(a)
 })
} catch (error) {
    section.innerHTML = "Cannot fetch posts"
    console.error(error)
}
}

fetchPosts()