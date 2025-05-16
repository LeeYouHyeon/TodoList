import { useRef, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import ChooseTags from "./ChooseTags";

export default function Main() {
  /* DB : todos, tags */
  const [todoDB, setTodoDB] = useState([]);
  const [tagDB, setTagDB] = useState([]);
  let nextTagId = useRef(1);
  let nextTodoId = useRef(1);

  /* ChooseTags --------------------------------- */
  // 1. chooseTags
  const [selected, setSelected] = useState([]);
  const toggleSelected = (i) => {
    if (selected.includes(i))
      setSelected(selected.filter(
        id => id !== i
      ));
    else setSelected([...selected, i]);
  }

  //2. showState : 태그 선택항목을 어디에 보여줄지 결정
  const [showTags, setShowTags] = useState({
    isShow: false,
    pos: 0
  });
  const tagsOff = () => {
    setShowTags({
      ...showTags,
      isShow: false
    });
  };
  const toggleShowTags = () => {
    setShowTags({
      ...showTags,
      isShow: !showTags.isShow
    });
  };

  // 태그 삭제. 이미 사용중인 경우 삭제 불가능
  const deleteTag = (id) => {
    let needToDelete = false;
    for (const todo of todoDB) {
      if (todo.tags.includes(id)) {
        if (window.confirm('사용중인 태그입니다. 정말로 삭제하시겠습니까?')) {
          needToDelete = true;
        } else return;
      }
    }

    if (needToDelete) {
      setTodoDB(todoDB.map(todo => {
        return {
          ...todo,
          tags: todo.tags.filter(tag => tag !== id)
        }
      }));
    }
    setTagDB(tagDB.filter(tag => tag.id !== id));
  }

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
  // inputText
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
        important: false
      }
    ]);

    // 입력 항목 초기화
    clearInputText();
    setSelected([]);
    nextTodoId.current++;
  }
  /* -------------------------------------------- */

  /* -------------------------------------------- */
  const deleteTodo = (id) => {
    setTodoDB(todoDB.filter(todo => todo.id !== id));
  }
  const toggleImportant = (id) => {
    setTodoDB(
      todoDB.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          important: !todo.important
        };
      })
    );

  };
  /* -------------------------------------------- */

  /* updateTodo --------------------------------- */
  const [updateTodo, setUpdateTodo] = useState({
    id: 0,
    text: ''
  });

  const openUpdateTodo = (id) => {
    const target = todoDB[
      todoDB.findIndex(todo => todo.id === id)
    ];
    if(!target) {
      alert('알 수 없는 오류');
      return;
    }

    setSelected([...target.tags]);
    setUpdateTodo({
      id: id,
      text: target.text
    });
    setShowTags({
      isShow: true,
      pos: id
    });
  };

  const closeUpdateTodo = () => {
    setUpdateTodo({
      id: 0,
      text: ''
    });
    tagsOff();
    setSelected([]);
    setShowTags({
      isShow: false,
      pos: 0
    });
  };

  const changeUpdateInput = (e) => {
    setUpdateTodo({
      ...updateTodo,
      text: e.target.value
    });
  };

  const confirmUpdateTodo = () => {
    if (updateTodo.text === '') return;
    for (const todo of todoDB) {
      if (todo.id !== updateTodo.id && todo.text === updateTodo.text) {
        alert('이미 있는 항목입니다.');
        return;
      }
    }

    setTodoDB(todoDB.map(todo => {
      if (todo.id !== updateTodo.id) return todo;
      return {
        ...todo,
        text: updateTodo.text,
        tags: [...selected]
      };
    }));

    closeUpdateTodo();
  }

  const updateTodoKit = {
    open: openUpdateTodo,
    close: closeUpdateTodo,
    onChange: changeUpdateInput,
    confirm: confirmUpdateTodo
  };
  /* -------------------------------------------- */

  /* filter ------------------------------------- */
  /* -------------------------------------------- */

  return <div className="main">
    {
      showTags.isShow &&
      <ChooseTags
        top={showTags.pos}
        tagDB={tagDB}
        selectedTags={selected}
        toggleTag={toggleSelected}
        deleteTag={deleteTag}
        createTagKit={createTagKit} />
    }
    <CreateTodo
      tags={{
        DB: tagDB,
        tagList: selected,
        toggleTag: toggleSelected,
        deleteTag: deleteTag
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
    <TodoList 
    todoDB={todoDB} 
    tagDB={tagDB} 
    deleteTodo={deleteTodo} 
    toggleImportant={toggleImportant}
    updateTodoKit={updateTodoKit}
    updateTodo={updateTodo}
     />
  </div>
};