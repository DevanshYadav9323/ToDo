import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import Footer from "./Footer";
import './App.css';



function App() {
  const [priority, setPriority] = useState(''); // Add this line
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return '00e67a'//green color;
      case 'medium':
        return 'FFFF00'//yellow color;
      case 'high':
        return 'FF0000'//red color;
      default:
        return '00C7FF' //blue color;
    }
  };

  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
      priority: priority, // Add this line
    };

    // console.log (newToDoObj);
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newToDoObj);
    // console.log (updatedTodoArr);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewDescription('');
    setNewTodoTitle('');
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem('completedTodos')
    );
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    // console.log (index);

    // console.log (reducedTodos);
    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);
  };

  const handleCompletedTodoDelete = index => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);
    // console.log (reducedCompletedTodos);
    localStorage.setItem(
      'completedTodos',
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleComplete = index => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' ,second: 'numeric', hour12: true });

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    // console.log (filteredTodo);

    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log(updatedCompletedList);
    setCompletedTodos(updatedCompletedList);
    localStorage.setItem(
      'completedTodos',
      JSON.stringify(updatedCompletedList)
    );
    // console.log (index);

    handleToDoDelete(index);
  };

  return (
    <>
      <div className='App-wrapper'>
        <div className="App">
          <h1>ToDo</h1>

          <div className="todo-wrapper">

            <div className="todo-input">
              <div className="todo-input-item">
                <label>Title:</label>
                <input
                  type="text"
                  value={newTodoTitle}
                  onChange={e => setNewTodoTitle(e.target.value)}
                  placeholder="Task title..."
                />
              </div>
              <div className="todo-input-item">
                <label>Description:</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Task description..."
                />
              </div>

              <div className="todo-input-item" id='priority-dropdown'>
                <label>Priority:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">Very Low</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="todo-input-item">
                <button
                  className="primary-btn"
                  type="button"
                  onClick={handleAddNewToDo}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="btn-area">
              <button
                className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
                id='secondaryBtn1'
                onClick={() => setIsCompletedScreen(false)}
              >
                Pending
              </button>
              <button
                className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
                id='secondaryBtn2'
                onClick={() => setIsCompletedScreen(true)}
              >
                Completed
              </button>
            </div>
            <div className="todo-list">

              {isCompletedScreen === false &&
                allTodos.map((item, index) => (
                  <div
                    className="todo-list-item"
                    key={index}
                    style={{
                      borderLeft: `4px solid #${getPriorityColor(item.priority)}`,
                    }}
                  >
                    <div>
                      <h3 style={{ color: `#${getPriorityColor(item.priority)}` }}>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        title="Delete?"
                        className="icon"
                        onClick={() => handleToDoDelete(index)}
                      />
                      <BsCheckLg
                        title="Completed?"
                        className=" check-icon"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                ))}

              {isCompletedScreen === true &&
                completedTodos.map((item, index) => (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3 style={{ color: `#${getPriorityColor(item.priority)}` }}>{item.title}</h3>
                      <p>{item.description}</p>
                      <p> <i>Completed: on {item.completedOn}</i></p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleCompletedTodoDelete(index)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;