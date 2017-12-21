import BaseApi from './_baseApi'

export default class extends BaseApi {
  create ({ title, bangumi_id, content, images, geetest }) {
    return this.http.post('post/create', {
      title, bangumi_id, content, images, geetest
    })
  }

  show ({ id, page, take }) {
    return this.http.get(`post/${id}/show`, {
      page, take
    })
  }
}
