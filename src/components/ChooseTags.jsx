import CreateTag from "./CreateTag";

export default function ChooseTags({ display, tagDB, selectedTags, toggleTag, createTagKit }) {
  if (!display) return;

  return <div className="chooseTags">
    {tagDB.length > 0 && <ul>{
      tagDB.map(tag => (
        <li className="tagLi"><div className="tagDiv"
          style={{
            color: tag.color,
            backgroundColor: tag.bgc
          }}>{tag.text}</div>
          <input type="checkbox"
            value={selectedTags.includes(tag.id)}
            onClick={() => {
              toggleTag(tag.id);
            }}
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