import RemoveBtn from "./buttons/RemoveBtn";
import CreateTag from "./CreateTag";

export default function ChooseTags({ top, tagDB, selectedTags, toggleTag, deleteTag, createTagKit }) {
  function translate(pos) {
    let answer = 10;
    if (pos !== 0) answer = 40 + (pos - 1) * 78;
    return answer + 'px';
  }

  return <div className="chooseTags"
    style={{
      top: translate(top)
    }
    }>
    {tagDB.length > 0 && <ul>{
      tagDB.map(tag => (
        <li className="tagLi"><div className="tagDiv"
          style={{
            color: tag.color,
            backgroundColor: tag.bgc
          }}>{tag.text}</div>
          <RemoveBtn onClick={() => {
            deleteTag(tag.id);
          }} />
          <div className="selectTag"
            onClick={() => {
              console.log(selectedTags, tag.id);
              toggleTag(tag.id);
            }}
          >{
              (selectedTags.includes(tag.id)) ?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                </svg>
            }
          </div>
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