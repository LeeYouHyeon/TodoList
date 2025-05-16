// import ChooseTags from "./ChooseTags";
import CreateBtn from "./buttons/CreateBtn";
import CancelBtn from "./buttons/CancelBtn";

export default function CreateTodo({ inputText, onCreate, toggleShowTags }) {
  return <div className="createTodo">
    <button onClick={toggleShowTags}>태그 선택</button>
    {/* <ChooseTags/> */}
    <div className="input">
      <input type="text"
        name="inputTodoText"
        placeholder="할 일 입력"
        value={inputText.value}
        onChange={inputText.onChange}
      />
      <CancelBtn onCancel={inputText.onCancel} />
    </div>
    <CreateBtn onCreate={onCreate} />
  </div>
};