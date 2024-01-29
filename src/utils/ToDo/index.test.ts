import { ToDoFetch } from '.';

global.fetch = jest.fn(async () =>
  await Promise.resolve({
    json: async () => await Promise.resolve({
      "data": [
        {
          "_id": "65b4823ca51b053c2774f4e3",
          "task": "tarea",
          "state": false,
          "priority": [
              "low"
          ],
          "createdAt": "2024-01-27T04:10:36.447Z",
          "updatedAt": "2024-01-27T17:18:46.991Z"
      }
      ]
  }),
  }),
) as jest.Mock;

describe('ToDoFetch', () => {
  let todoFetch: ToDoFetch;

  beforeEach(() => {
    todoFetch = new ToDoFetch();
  });

  /* afterEach(() => {
    jest.resetAllMocks();
  }); */

  it('should create a new task', async () => {
    await todoFetch.create({ taskName: 'New Task', priority: 'High' });

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: 'New Task', state: false, priority: 'High' }),
    });
  });

  it('should update an existing task', async () => {
    await todoFetch.update({
      _id: '123456',
      taskName: 'Updated Task',
      priority: 'Medium',
      state: true,
    });

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/tasks/123456', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: 'Updated Task', state: true, priority: 'Medium' }),
    });
  });



  it('should delete a task', async () => {
    await todoFetch.delete('123456');

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/tasks/123456', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('should read tasks', async () => {
    await todoFetch.read();

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/tasks', { method: 'GET' });
  });
});
