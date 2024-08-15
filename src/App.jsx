import './App.scss';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ControlButtons from './ControlButtons';
import { useState, useEffect, useRef } from 'react';
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

	function handleDeleteTask(index) {
		const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
		save(STORAGE, newTasks);
		setTasks(newTasks);
	}

	function handleEditTask(index) {
		const updatingText = tasks[index].text;
		handleDeleteTask(index);
		setText(updatingText);
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
				></ControlButtons>
			</div>
		</div>
	);
}

export default App;
