export default function ChooseTags({ tagList, selectedTags, toggleTag }) {
  if (tagList) {
    tagList = tagList.map(tag => (
      <div className="tag">
        <div className="text"
          key={tag.id}
          style={{
            color: tag.color,
            backgroundColor: tag.backgroundColor
          }}>{tag.text}</div>
        <input type="checkbox"
          key={tag.id}
          value={selectedTags.includes(tag.id)}
          onClick={() => {
            toggleTag(tag.id);
          }}
        />
      </div>
    ));
  } else {
    tagList = (
      <span>태그가 없습니다. 아래 버튼을 눌러 태그를 추가해보세요.</span>
    )
  }

  return <div className="chooseTags">
    {tagList}
  </div>
}