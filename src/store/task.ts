import { ITask } from '@/models'

export default {
  namespaced: true,
  state: {
    tasksList: []
  },
  mutations: {
    addTask(state: any, task: ITask): void {
      const id = state.tasksList.length
      state.tasksList.push({ ...task, id })
    },

    addNote(state: any, payload: any): void {
      const neededTask = state.tasksList.find((item: ITask) => item.id === payload.id)
      neededTask.todos.push(payload.todo)
    }
  }
}
