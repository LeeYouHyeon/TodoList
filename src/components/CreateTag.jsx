import CancelBtn from "./buttons/CancelBtn";
import CreateBtn from "./buttons/CreateBtn";

export default function CreateTag({ text, color, bgc, onChange, onCancel, onCreate }) {
  return (
    <div className="createTag">
      <div className="inputTagText">
        <input type="text"
          name="inputTagText"
          placeholder="태그명 입력"
          value={text}
          onChange={onChange}
          style={{
            color: color,
            backgroundColor: bgc
          }}
        />
        <CancelBtn onCancel={onCancel} />
      </div>
      <div className="colorInput">
        <input type="color"
          name="inputTagColor"
          value={color}
          onChange={onChange} />
        <input type="color"
          name="inputTagBgc"
          value={bgc}
          onChange={onChange} />
      </div>
      <div className="buttons">
        <CancelBtn onCancel={onCancel} />
        <CreateBtn onCreate={onCreate} />
      </div>
    </div>
  );
}