import Todo from "./Todo";
import UpdateTodo from "./UpdateTodo";

export default function TodoList({ todoDB, tagDB, deleteTodo, toggleImportant, updateTodoKit, updateTodo }) {
  return <div className="todoList">
    {
      todoDB.map(todo => {
        if (todo.id === updateTodo.id) {
          console.log(tagDB);
          const tags = tagDB.filter(tag => todo.tags.includes(tag.id));
          console.log(tags);
          return <UpdateTodo
            inputText={updateTodo.text}
            updateKit={updateTodoKit}
            tags={tags}
            important={todo.important}
          />;
        }
        else return <Todo
          todo={todo}
          tagDB={tagDB}
          openUpdateTodo={updateTodoKit.open}
          deleteTodo={deleteTodo}
          toggleImportant={toggleImportant} />;
      })
    }
  </div>
}