import BangumiApi from '~/api/bangumiApi'
import UserApi from '~/api/userApi'
import ImageApi from '~/api/imageApi'

export default {
  namespaced: true,
  state: () => ({
    waterfall: {
      data: [],
      take: 12,
      options: {},
      noMore: false,
      size: 0,
      tags: 0,
      page: 1,
      bangumiId: -1,
      roleId: -1,
      creator: -1
    }
  }),
  mutations: {
    SET_WATERFALL (state, data) {
      state.waterfall.data = state.waterfall.data.concat(data.list)
      state.waterfall.options = data.type
      state.waterfall.noMore = data.list.length < state.waterfall.take
      state.waterfall.page++
    },
    SET_WATERFALL_META (state, { size, tags, bangumiId, roleId, creator }) {
      state.waterfall.size = size
      state.waterfall.tags = tags
      state.waterfall.bangumiId = bangumiId
      state.waterfall.roleId = roleId
      state.waterfall.creator = creator
      state.waterfall.noMore = false
      state.waterfall.data = []
      state.waterfall.page = 1
    },
    DELETE_WATERFALL (state, { id }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data.splice(index, 1)
        }
      })
    },
    EDIT_WATERFALL (state, data) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === data.id) {
          state.waterfall.data[index].role_id = data.role_id
          state.waterfall.data[index].size = data.size
          state.waterfall.data[index].tags = data.tags
          state.waterfall.data[index].role = data.role
        }
      })
    },
    LIKE_WATERFALL (state, { id, result }) {
      state.waterfall.data.forEach((image, index) => {
        if (image.id === id) {
          state.waterfall.data[index].like_count += result ? 1 : -1
          state.waterfall.data[index].liked = result
        }
      })
    }
  },
  actions: {
    async getBangumiImages ({ state, commit }, { id, ctx }) {
      const waterfall = state.waterfall
      if (waterfall.noMore) {
        return
      }
      const api = new BangumiApi(ctx)
      const data = await api.images({
        id,
        take: state.waterfall.take,
        seenIds: state.waterfall.data.length ? state.waterfall.data.map(item => item.id).join(',') : null,
        size: waterfall.size,
        tags: waterfall.tags,
        roleId: waterfall.roleId,
        creator: waterfall.creator
      })
      commit('SET_WATERFALL', data)
    },
    async getUserImages ({ state, commit }, { zone, ctx }) {
      const waterfall = state.waterfall
      if (waterfall.noMore) {
        return
      }
      const api = new UserApi(ctx)
      const data = await api.images({
        zone,
        page: waterfall.page,
        take: waterfall.take,
        size: waterfall.size,
        tags: waterfall.tags,
        bangumiId: waterfall.bangumiId,
        creator: waterfall.creator
      })
      commit('SET_WATERFALL', data)
    },
    async getTrendingImages ({ state, commit }, { sort, ctx }) {
      const waterfall = state.waterfall
      if (waterfall.noMore) {
        return
      }
      const api = new ImageApi(ctx)
      const data = await api.trendingList({
        seenIds: state.waterfall.data.length ? state.waterfall.data.map(item => item.id).join(',') : null,
        take: waterfall.take,
        size: waterfall.size,
        tags: waterfall.tags,
        bangumiId: waterfall.bangumiId,
        creator: waterfall.creator,
        sort
      })
      commit('SET_WATERFALL', data)
    }
  },
  getters: {}
}
