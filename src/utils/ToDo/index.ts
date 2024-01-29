export interface ReadListTasks {
    task: string,
    state: boolean,
    priority: string,
    _id:string,
    createdAt: string,
    updatedAt: string,
} 

export class ToDoFetch {

  readonly pathToDo = 'http://localhost:4000/api/tasks'


  async create({
    taskName,
    priority
  }: {
    taskName: string,
    priority: string
  }):Promise<void> {
    try {
      const res = await fetch(this.pathToDo, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskName,
          state: false,
          priority
      })
      })
  
      await res.json();

      } catch (error) {
        console.log({error});
        throw new Error('Error on create task')
      }
  }


  async update({
    _id,
    taskName,
    priority,
    state
  }: {
    _id: string,
    taskName: string,
    priority: string,
    state: boolean
  }):Promise<void> {
    try {
      const res = await fetch(this.pathToDo+ '/'+_id, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskName,
          state,
          priority
      })
      })
  
      await res.json();

      } catch (error) {
        console.log({error});
        throw new Error('Error on update task')
      }
  }

  async read (): Promise<ReadListTasks[]>{
    try {
      
      const res = await fetch(this.pathToDo, {
        method: 'GET',
      })
      
      const response = await res.json();

      return response.data.map((item: { priority: any[]; }) => ({...item, priority: item.priority[0]})) as ReadListTasks[];

      } catch (error) {
        console.log({error});
        throw new Error('Error on read task')
      }
  }


  async delete(_id: string):Promise<void> {
    try {
      const res = await fetch(this.pathToDo+ '/'+_id, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      await res.json();

      } catch (error) {
        console.log({error});
        throw new Error('Error on delete task')
      }
  }

}