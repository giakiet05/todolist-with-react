import './App.scss';
import TaskItem from './TaskItem';
export default function TaskList({
	tasks,
	onDeleteTask,
	onEditTask,
	onToggleChecked
}) {
	const list = tasks.map((task) => {
		return (
			<TaskItem
				key={task.id}
				task={task}
				onToggleChecked={onToggleChecked}
				onDeleteTask={onDeleteTask}
				onEditTask={onEditTask}
			/>
		);
	});

	return (
		<ul className="list-group list-group-flush task-list my-4 overflow-y-auto">
			{list}
		</ul>
	);
}
