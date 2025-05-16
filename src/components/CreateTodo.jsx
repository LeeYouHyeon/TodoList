// import ChooseTags from "./ChooseTags";
import CreateBtn from "./buttons/CreateBtn";
import CancelBtn from "./buttons/CancelBtn";
import ChooseTags from "./ChooseTags";

export default function CreateTodo({ tags, createTagKit, inputText, onCreate, showTags, toggleShowTags }) {
  return <div className="createTodo">
    <ChooseTags
      display={showTags}
      tagDB={tags.DB}
      selectedTags={tags.tagList}
      toggleTag={tags.toggleTag}
      createTagKit={createTagKit} />
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