import CancelBtn from "./buttons/CancelBtn";
import CreateBtn from "./buttons/CreateBtn";

export default function CreateTag({ text, color, bgc, onChange, onCancel, onCreate }) {
  return (
    <div className="createTag">
      <table>
        <tbody>
          <tr>
            <td colSpan={2}><div className="inputTagText">
              <input type="text"
                name="inputTagText"
                placeholder="태그 추가"
                value={text}
                onChange={onChange}
                style={{
                  color: color,
                  backgroundColor: bgc
                }}
              /></div>
            </td>
          </tr>
          <tr>
            <td>
              <input type="color"
                name="inputTagColor"
                value={color}
                onChange={onChange}
                className="colorInput" />
            </td>
            <td>
              <input type="color"
                name="inputTagBgc"
                value={bgc}
                onChange={onChange}
                className="colorInput" />
            </td>
          </tr>
          <tr>
            <td><CancelBtn onCancel={onCancel} /></td>
            <td><CreateBtn onCreate={onCreate} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}