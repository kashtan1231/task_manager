import { INote, ITask } from '@/models'

export default {
  namespaced: true,
  state: {
    tasksList: [],
    prevTasksList: []
  },
  mutations: {
    addTask(state: any, task: ITask): void {
      state.prevTasksList = [...state.tasksList]
      const id = state.tasksList.length
      state.tasksList.push({ ...task, id })
    },

    editTask(state: any, task: ITask): void {
      state.prevTasksList = [...state.tasksList]
      state.tasksList[task.id] = { ...task }
    },

    deleteTask(state: any, taskId: number): void {
      state.prevTasksList = [...state.tasksList]
      state.tasksList.splice(taskId, 1)
    },

    undoAction(state: any) {
      state.tasksList = [...state.prevTasksList]
    },

    addNote(state: any, payload: any): void {
      const neededTask = state.tasksList.find((item: ITask) => item.id === payload.id)
      neededTask.todos.push(payload.todo)
    }
  }
}
