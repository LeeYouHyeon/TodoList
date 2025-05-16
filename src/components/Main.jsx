import { useRef, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

export default function Main() {
  /* DB : todos, tags */
  const [todoDB, setTodoDB] = useState([]);
  const [tagDB, setTagDB] = useState([]);
  let nextTagId = useRef(1);
  let nextTodoId = useRef(1);

  /* CreateTag ---------------------------------- */
  // 1. inputTag
  const [inputTag, setInputTag] = useState({
    text: '',
    color: '#000000',
    bgc: '#FFFFFF'
  });

  // 2. changeInputTag
  const onChangeInputTag = (e) => {
    // let key = {
    //   'inputTagText': 'text',
    //   'inputTagColor': 'color',
    //   'inputTagBgc': 'bgc'
    // }[e.target.name];
    let key;
    switch (e.target.name) {
      case 'inputTagText': key = 'text'; break;
      case 'inputTagColor': key = 'color'; break;
      case 'inputTagBgc': key = 'bgc'; break;
      default: ;
    }
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

    if (inputTag.text === '') return;

    setTagDB([
      ...tagDB,
      {
        id: nextTagId.current,
        text: inputTag.text,
        color: inputTag.color,
        bgc: inputTag.bgc
      }
    ]);
    nextTagId.current++;

    clearInputTag();
  }

  const createTagKit = {
    text: inputTag.text,
    color: inputTag.color,
    bgc: inputTag.bgc,
    onChange: onChangeInputTag,
    onCancel: clearInputTag,
    onCreate: createTag
  };
  /* -------------------------------------------- */

  /* CreateTodo --------------------------------- */
  // 1. chooseTags
  const [selected, setSelected] = useState([]);
  const toggleSelected = (i) => {
    if (selected.includes(i))
      setSelected(selected.filter(
        tag => tag.id !== i
      ));
    else setSelected([...selected, i]);
  }
  // 태그 선택항목을 보여줄지 말지 선택
  const [showTags, setShowTags] = useState(false);
  const toggleShowTags = () => {
    setShowTags(a => !a);
  }

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

    if (inputText === '') return;

    selected.sort();
    // todo 등록
    setTodoDB([
      ...todoDB, {
        id: nextTodoId.current,
        text: inputText,
        tags: [...selected],
      }
    ]);

    // 입력 항목 초기화
    clearInputText();
    setSelected([]);
    setShowTags(false);
    nextTodoId.current++;
  }
  /* -------------------------------------------- */

  return <div className="main">
    <CreateTodo
      tags={{
        DB: tagDB,
        tagList: selected,
        toggleTag: toggleSelected,
      }}
      createTagKit={createTagKit}
      inputText={{
        value: inputText,
        onChange: (e) => {
          setInputText(e.target.value);
        },
        onCancel: clearInputText
      }}
      onCreate={registerTodo}
      showTags={showTags}
      toggleShowTags={toggleShowTags}
    />
    {/* filter 부분 */}
    <TodoList todoDB={todoDB} tagDB={tagDB} />
  </div>
};