import { makeRequest } from "@/api/axios"

export function getAllPosts() {
  return makeRequest("/admin/posts/all?page=0&size=4")
}

export function getPost(slug) {
  return makeRequest(`/admin/posts/${slug}`)
}

// export function getRelatedPosts(slug) {
//   return makeRequest(`/admin/posts/${slug}`)
// }
