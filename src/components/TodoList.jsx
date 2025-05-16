import Todo from "./Todo";

export default function TodoList({ todoDB, tagDB }) {
  return <div className="todoList">
    {
      todoDB.map(todo => <Todo todo={todo} tagDB={tagDB} />)
    }
  </div>
}