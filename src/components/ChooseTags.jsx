import RemoveBtn from "./buttons/RemoveBtn";
import ToggleBtn from "./buttons/ToggleBtn";
import CreateTag from "./CreateTag";

export default function ChooseTags({ top, tagDB, selectedTags, toggleTag, deleteTag, createTagKit }) {
  function translate(pos) {
    let answer = 0;
    if (pos !== 0) answer = 120 + (pos - 1) * 78;
    return answer + 'px';
  }

  return <div className="chooseTags"
    style={{
      top: translate(top)
    }
    }>
    {tagDB.length > 0 && <ul>{
      tagDB.map(tag => (
        <li className="tagLi">
          <div className="tagDiv"
            style={{
              color: tag.color,
              backgroundColor: tag.bgc
            }}>{tag.text}</div>
          <RemoveBtn onClick={() => {
            deleteTag(tag.id);
          }} />
          <ToggleBtn
            onClick={() => {
              toggleTag(tag.id);
            }}
            isOn={selectedTags.includes(tag.id)}
            clsName="selectTag"
          />
        </li>
      ))
    }</ul>}
    {tagDB.length === 0 && (<div className="noTags">
      <span>태그가 없습니다.</span>
      <p>태그를 추가해보세요.</p>
    </div>
    )}
    <CreateTag
      text={createTagKit.text}
      color={createTagKit.color}
      bgc={createTagKit.bgc}
      onChange={createTagKit.onChange}
      onCancel={createTagKit.onCancel}
      onCreate={createTagKit.onCreate} />
  </div>
}