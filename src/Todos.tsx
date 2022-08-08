import {useEffect, useState} from 'react';
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import StatusList from './components/StatusList'
import style from './style.module.css'

// import style from './style.module.css';
export interface Todo {
  id: number,
  title: string,
  completed: boolean,
}
export type TodosListTyp = Array<Todo>;



function Todos(){
  const [value, setValue] = useState('');
  const [todosList, setTodosList] = useState<TodosListTyp>([]);
  const [todosActive, setTodosActive] = useState<TodosListTyp>([]);
  const [todosCompleted, setTodosCompleted] = useState<TodosListTyp>([]);
  const [toggleAll, setToggleAll] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(
    function completedAll(){
      todosList.forEach((todo) => {
        todo.completed = toggleAll;
      })
      setTodosList([...todosList]);
    }, [toggleAll]
  )

  useEffect(
    function updateTodos() {
      const activeList: TodosListTyp = [];
      const completedList: TodosListTyp = [];
      todosList.forEach(todo => {
        if(!todo.completed){
          activeList.push(todo) ;
        } else {
          completedList.push(todo);
        }
      })
      setTodosActive(activeList);
      setTodosCompleted(completedList);
    }, 
    [todosList]
  )

    function addTodo(e:any):void{
      if(e.key === 'Enter'){
        todosList.push({
          id: Date.now(),
          title: value,
          completed: false,
        });
        setTodosList([...todosList]);
        setValue('');
      }
    }

  return (
    <>
      <h1 className={style.todosHeading}>todos</h1><div className={style.todos}>
      <TodoInput
        value={value}
        setValue={setValue}
        addTodo={addTodo}
        toggleAll={toggleAll}
        setToggleAll={setToggleAll} />
      <TodoList
        todosList={todosList}
        setTodosList={setTodosList}
        todosActive = {todosActive}
        todosCompleted = {todosCompleted}
        activeTab={activeTab}
       />
       {
        todosList.length ? (
          <StatusList
            todosList={todosList}
            itemsLeft={todosActive.length}
            setTodosList={setTodosList} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : undefined
       }
      </div>
    </>
  )
}

export default Todos;

// для отображения отфильтрованных списков todos можно написать функцию фильтра и и вызывать ее с разным аргументов по клику по каждой из кнопок в меню