import { useRef, useState } from "react";
import CreateTodo from "./CreateTodo";
import CreateTag from "./CreateTag";

export default function Main() {
  class Tag {
    constructor(text, color, bgc) {
      this.id = nextTagId;
      this.text = text;
      this.color = color;
      this.bgc = bgc;
      nextTagId++;
    }
  }

  class Todo {
    constructor(text, tags) {
      this.text = text;
      this.tags = tags;
      this.important = false;
    }

    toggleImportant() {
      this.important = !this.important;
    }
  }

  /* DB : todos, tags */
  const [todoDB, setTodoDB] = useState([]);
  const [tagDB, setTagDB] = useState([]);
  const nextTagId = useRef(1);

  /* CreateTag ---------------------------------- */
  // 1. inputTag
  const [inputTag, setInputTag] = useState({
    text: '',
    color: '#000000',
    bgc: '#FFFFFF'
  });

  // 2. changeInputTag
  const onChangeInputTag = (e) => {
    let key = {
      'inputTagText': 'text',
      'inputTagColor': 'color',
      'inputTagBgc': 'bgc'
    }[e.target.name];
    setInputTag({
      ...inputTag,
      [key]: e.target.value
    });
  }

  const clearInputTag = () => {
    setInputTag({
      text: '',
      color: '#000000',
      bgc: '#FFFFFF'
    });
  }

  // 태그 등록
  const createTag = () => {
    for (const tag of tagDB) {
      if (tag.text === inputTag.text) {
        alert('같은 이름의 태그가 존재합니다.');
        return;
      }
    }

    setTagDB([
      ...tagDB,
      new Tag(inputTag.text, inputTag.color, inputTag.bgc)
    ]);

    clearInputTag();
  }
  /* -------------------------------------------- */

  /* CreateTodo --------------------------------- */
  // 1. chooseTags
  const [selected, setSelected] = useState([]);

  // 2. inputText
  const [inputText, setInputText] = useState('');

  const clearInputText = () => { setInputText('') };

  const registerTodo = () => {
    // 중복 체크
    for (const todo of todoDB) {
      if (todo.text === inputText) {
        alert('이미 있는 항목입니다.');
        return;
      }
    }

    // todo 등록 : tag는 나중에 작업
    setTodoDB([
      ...todoDB,
      new Todo(inputText, selected)
    ]);

    // 입력 항목 초기화
    clearInputText();
    clearInputTag();
    setSelected([]);
  }
  /* -------------------------------------------- */

  return <div className="main">
    <CreateTodo
      texts={{
        value: inputText,
        onChange: (e) => {
          setInputText(e.target.value);
        },
        onCancel: clearInputText
      }}
      onCreate={registerTodo}
    />
    <CreateTag
      text={inputTag.text}
      color={inputTag.color}
      bgc={inputTag.bgc}
      onChange={onChangeInputTag}
      onCancel={clearInputTag}
      onCreate={createTag}
    />
    {/* filter 부분 */}
    {/* todos.map() */}
  </div>
};