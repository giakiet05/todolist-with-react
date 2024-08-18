import './App.scss';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ControlButtons from './ControlButtons';
import { useState, useEffect, useRef, createContext } from 'react';

const TaskContext = createContext(); //  context to direcly passing props to TaskItem without going throung TaskList
//This is just an example of using createContext, however, in this case, it is not necessary
//createContext should be used when you have to pass the same props through multiple levels of components, or to create a global state
function App() {
	const STORAGE = 'todolist-react';
	const COUNTER_STORAGE = 'task-counter';
	const [tasks, setTasks] = useState(
		() => JSON.parse(localStorage.getItem(STORAGE)) || []
	);
	const [text, setText] = useState('');
	const [filter, setFilter] = useState('all');
	const [count, setCount] = useState(
		() => parseInt(localStorage.getItem(COUNTER_STORAGE)) || 1
	); //counter to set id for each task created
	const inputRef = useRef();
	useEffect(() => {
		// Add classes to body when component mounts
		document.body.classList.add(
			'd-flex',
			'align-items-center',
			'justify-content-center',
			'vh-100'
		);
	}, []);

	function save(storage, data) {
		localStorage.setItem(storage, JSON.stringify(data));
	}

	function handleAddTask(text) {
		if (!text) return;
		const newTask = {
			id: count,
			text: text,
			checked: false
		};
		setTasks((prev) => {
			const newTasks = [newTask, ...prev];
			save(STORAGE, newTasks);
			return newTasks;
		});
		setText('');

		setCount((prev) => {
			const newCount = prev + 1;
			save(COUNTER_STORAGE, newCount); // Update counter in localStorage
			return newCount;
		});
		inputRef.current.focus();
	}

	function handleToggleChecked(taskId) {
		const newTasks = tasks.map((task) =>
			task.id === taskId ? { ...task, checked: !task.checked } : task
		);
		save(STORAGE, newTasks);
		setTasks(newTasks);
	}

	function handleDeleteTask(taskId) {
		let newTasks;
		if (tasks.length === 1) {
			newTasks = [];
			setCount(1);
			save(COUNTER_STORAGE, 1);
		} else newTasks = tasks.filter((task) => task.id !== taskId);
		save(STORAGE, newTasks);
		setTasks(newTasks);
	}

	function handleEditTask(taskId) {
		const updatingTask = tasks.find((task) => task.id === taskId);
		handleDeleteTask(taskId);
		setText(updatingTask.text);
		inputRef.current.focus();
	}

	function handleCheckAll() {
		const isCheckedAll = tasks.every((task) => task.checked);
		let newTasks;

		if (isCheckedAll) {
			// If all tasks are checked, uncheck them
			newTasks = tasks.map((task) => ({ text: task.text, checked: false }));
		} else {
			// If not all tasks are checked, check them all
			newTasks = tasks.map((task) => ({ text: task.text, checked: true }));
		}
		save(STORAGE, newTasks);
		setTasks(newTasks);
	}

	function handleDeleteAll() {
		save(STORAGE, []);
		save(COUNTER_STORAGE, 1);
		setCount(1);
		setTasks([]);
	}

	function filterTasks(tasks, filter) {
		switch (filter) {
			case 'completed':
				return tasks.filter((task) => task.checked);
			case 'incompleted':
				return tasks.filter((task) => task.checked === false);
			default:
				return tasks;
		}
	}

	return (
		<TaskContext.Provider
			value={{ handleDeleteTask, handleEditTask, handleToggleChecked }}
		>
			<div className="app bg-light rounded m-3">
				<Header
					tasks={tasks}
					completedTasks={tasks.filter((task) => task.checked)}
				/>
				<div className="container-lg mb-3 pb-3">
					<TaskForm
						onAddTask={handleAddTask}
						inputRef={inputRef}
						text={text}
						setText={setText}
					></TaskForm>
					<TaskList
						tasks={filterTasks(tasks, filter)}
						onDeleteTask={handleDeleteTask}
						onEditTask={handleEditTask}
						onToggleChecked={handleToggleChecked}
					></TaskList>
					<ControlButtons
						onDeleteAll={handleDeleteAll}
						onCheckAll={handleCheckAll}
						setFilter={setFilter}
						filter={filter}
					></ControlButtons>
				</div>
			</div>
		</TaskContext.Provider>
	);
}

export default App;
export { TaskContext };
