import $axios from '../api.js'

const state = () => ({
	pesertas: [],
	peserta: {
		no_ujian: '',
		nama: '',
		password: ''
	},
	page: 1
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.pesertas = payload
	},
	SET_PAGE(state, payload) {
		state.page = payload
	},
	ASSIGN_FORM(state, payload) {
		state.peserta = {
			no_ujian: payload.no_ujian,
			nama: payload.nama,
			password: payload.password
		}
	},
	CLEAR_FORM(state) {
		state.peserta = {
			no_ujian : '',
			nama: '',
			password: ''
		}
	}
}

const actions = {
	getPesertas({ commit, state }, payload) {
		let search = typeof payload != 'undefined' ? payload : ''
		return new Promise(( resolve, reject ) => {
			$axios.get(`/peserta?page=${state.page}&q=${search}`)
			.then((response) => {
				commit('ASSIGN_DATA', response.data)
				resolve(response.data)
			})
		})
	},
	submitPeserta({ dispatch, commit, state }) {
		return new Promise((resolve, reject) => {
			$axios.post(`/peserta`, state.peserta)
			.then((response) => {
				dispatch('getPesertas').then(() => {
					resolve(response.data)
				})
			})
			.catch((error) => {
				if (error.response.status == 422) {
					commit('SET_LOADING', false, { root: true })
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
			})
		})
	},
	removePeserta({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			$axios.delete(`/peserta/${payload}`)
			.then((response) => {
				dispatch('getPesertas').then(() => resolve())
			})
		})
	},
	resetLoginPeserta({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			$axios.post(`/peserta/reset`,payload)
			.then((response) => {
				dispatch('getPesertas').then(() => resolve())
			})
		})
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}