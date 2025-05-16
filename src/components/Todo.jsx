export default function Todo({ todo, tagDB }) {
  const tags = tagDB.filter(tag => todo.tags.includes(tag.id));

  console.log(tags);
  console.log(todo);

  return <div className={`todo ${todo.id}`}
    style={{
      color: todo.color,
      backgroundColor: todo.bgc
    }}
    key={todo.id}>
    <div className="todoTags">{
      tags.map(tag => <div className='todoTag' key={tag.id} style={{
        color: tag.color,
        backgroundColor: tag.bgc
      }}>
        {tag.text}
      </div>)
    }
    </div>
    <div className={`todoText todoText${todo.id}`}>{todo.text}</div>
  </div>;
};