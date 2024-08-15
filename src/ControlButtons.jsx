export default function ControlButtons({
	onDeleteAll,
	onCheckAll,
	filter,
	setFilter
}) {
	const setButtonType = (filterType) =>
		filter === filterType ? 'btn-info' : 'btn-warning';

	return (
		<div className="d-flex justify-content-between">
			<div className="d-flex gap-1">
				<button
					className={`btn ${setButtonType('all')}`}
					onClick={() => setFilter('all')}
				>
					All
				</button>
				<button
					className={`btn ${setButtonType('completed')}`}
					onClick={() => setFilter('completed')}
				>
					Completed
				</button>
				<button
					className={`btn ${setButtonType('incompleted')}`}
					onClick={() => setFilter('incompleted')}
				>
					Incompleted
				</button>
			</div>
			<div className="d-flex gap-1">
				<button className="btn btn-primary" onClick={onCheckAll}>
					Check all
				</button>
				<button className="btn btn-danger" onClick={onDeleteAll}>
					Delete all
				</button>
			</div>
		</div>
	);
}
