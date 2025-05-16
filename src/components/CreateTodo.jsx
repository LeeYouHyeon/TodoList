// import ChooseTags from "./ChooseTags";
import CreateBtn from "./buttons/CreateBtn";
import CancelBtn from "./buttons/CancelBtn";

export default function CreateTodo({ tags, texts, onCreate }) {
  return <div className="createTodo">
    {/* <ChooseTags/> */}
    <input type="text"
      name="inputTodoText"
      placeholder="할 일 입력"
      value={texts.value}
      onChange={texts.onChange}
    />
    <CancelBtn onCancel={texts.onCancel}/>
    <CreateBtn onCreate={onCreate} />
  </div>
};