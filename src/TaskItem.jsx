import './App.scss';

export default function TaskItem({
	task,
	onToggleChecked,
	onDeleteTask,
	onEditTask
}) {
	return (
		<li className="task-item list-group-item">
			<div className="task-content">
				<input
					checked={task.checked}
					className="form-check-input border-black"
					type="checkbox"
					onChange={() => onToggleChecked(task.id)}
				/>
				<p>{task.text}</p>
			</div>
			<div className="task-control">
				<button
					className="btn btn-success btn-sm"
					onClick={() => onEditTask(task.id)}
				>
					<i className="fa-solid fa-pen-to-square"></i>
				</button>
				<button
					className="btn btn-danger btn-sm"
					onClick={() => onDeleteTask(task.id)}
				>
					<i className="fa-solid fa-close"></i>
				</button>
			</div>
		</li>
	);
}
