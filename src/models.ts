export interface INote {
  text: string
  isMarked: boolean
  id: number
}

export interface ITask {
  name: string
  description: string
  id: number
  notesList: INote
}
