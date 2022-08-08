import style from './style.module.css'
import {Todo, TodosListTyp} from '../../Todos'

function ListItem(props:any){

  const todo = props.todo;
  const completeToggle = props.completedToggle;
  const deleteTodo = props.deleteTodo;
  
  return (
    <li className={`${style.todoItem} ${todo.completed ? style.checked : ''}`}>
      <span 
        onClick={() => completeToggle(todo.id)} 
        className={style.completed}
      ></span>
      <p className={style.title}> {todo.title} </p>
      <span
        onClick={() => deleteTodo(todo.id)}
        className={style.deleteTodo}
      ></span>
    </li>
  )
}

function TodoList (props:any){

  const todosList = props.todosList;
  const setTodosList = props.setTodosList;
  const activeTab = props.activeTab;
  const todosActive = props.todosActive;
  const todosCompleted = props.todosCompleted;

  function completeToggle(id:number){
    todosList.forEach((todo:Todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
    });
    setTodosList([...todosList]);
  }

  function deleteTodo(id:number){
    const newTodoList = todosList.filter((todo:Todo) => todo.id !== id);
    setTodosList(newTodoList);
  }

  let renderTodoList = [];

  if(activeTab === 'All') {
    renderTodoList = todosList;
  } else if(activeTab === 'Active'){
    renderTodoList = todosActive;
  } else if(activeTab === 'Completed'){
    renderTodoList = todosCompleted;
  }

  return (
    <ul className={style.todoList}>
    {
      renderTodoList.map((todo:Todo) => {
        return <ListItem 
                  todo = {todo}
                  key = {todo.id}
                  todosList = {todosList}
                  setTodosList = {setTodosList}
                  completedToggle={completeToggle}
                  deleteTodo={deleteTodo}
                />
      })
    }
    </ul>
  )
}

export default TodoList;