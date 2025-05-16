export default function UpdateTodo({ inputText, updateKit, tags, important }) {
  const { close, onChange, confirm } = updateKit;

  return <div className="updateTodoBox">
    <div className="tagAndImp">
      <div className="todoTags">{
        tags.map(tag => <div className='todoTag' key={tag.id} style={{
          color: tag.color,
          backgroundColor: tag.bgc
        }}>
          {tag.text}
        </div>)
      }
      </div>
      <div className="isImportant"
        style={{
          color: important ? 'red' : 'gray'
        }}>★</div>
    </div>
    <div className="todoContent">
      <input type="text"
        value={inputText}
        onChange={(e) => {
          onChange(e)
        }}
      />
      <div className="buttons">
        <div className="updateCancel" onClick={close}>취소</div>
        <div className="confirmUpdate" onClick={confirm}>확인</div>
      </div>
    </div>
  </div>
}