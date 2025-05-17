import ToggleBtn from "./buttons/ToggleBtn";

export default function Filter({ tagDB, filterImportant, filterTags, toggleImportant, toggleTags, isFilterOpen }) {
  if (!isFilterOpen) return;

  return <div className="filter">
    <span>태그와 중요 키워드로</span>
    <span>할 일을 필터링할 수 있습니다.</span>
    <p></p>
    <ul>
      <li className="tagLi">
        <div className="tagDiv filterImportant">중요한 일</div>
        <ToggleBtn
          onClick={() => {
            toggleImportant();
          }}
          isOn={filterImportant}
          clsName="selectFilter"
        />
      </li>
      {
        tagDB.map(tag => (
          <li className="tagLi">
            <div className="tagDiv filterTag"
              style={{
                color: tag.color,
                backgroundColor: tag.bgc
              }}>{tag.text}</div>
            <ToggleBtn
              onClick={() => {
                toggleTags(tag.id);
              }}
              isOn={filterTags.includes(tag.id)}
              clsName="selectFilter"
            />
          </li>
        ))
      }
    </ul>
  </div>;
}