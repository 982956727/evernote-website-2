import Trash from '../../apis/trash'
import { Message } from 'element-ui'

const state = {
  trashNote: null,
  curTrashNote: null
}

const getters = {
  trashNotes: state => state.trashNote || [],

  curTrashNote: (state,getters) => {
    if(!state.curTrashNoteId) return getters.trashNotes[0] || {}
    return state.trashNotes.find(note => note.id == state.curTrashNoteId) || {}
  }
}

const mutations = {
  setTrashNotes(state,payload) {
    state.trashNotes = payload.trashNotes
  },
  addTrashNote(state,payload) {
    setTrashNotes.unshift(payload.note)
  },
  deleteTrashNote(state,payload) {
    state.curTrashNote = state.trashNotes.filter(note => note.id != payload.noteId)
  },
  setCurTrashNote(state,payload) {
    state.curTrashNoteId = payload.curTrashNoteId
  }
}

const actions = {
  getTrashNotes({ commit }) {
    return Trash.getAll()
      .then(res => {
        commit("setTrashNotes", { trashNotes: res.data })
    })
  },
  deleteTrashNote({ commit }, { noteId }) {
    return Trash.deleteNote({ noteId })
      .then(res => {
        commit("deleteTrashNote", { noteId })
        Message.success(res.msg)
    })
  },
  revertTrashNote({ commit }, { noteId }) {
    return Trash.revertNote({ noteId })
      .then(res => {
        commit("deleteTrashNote", { noteId })
        Message.success(res.msg)
    })  
  }
}

export default {
  state,
  getters,
  mutations,
  actions 
}