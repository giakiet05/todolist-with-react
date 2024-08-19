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
			{/* Filters */}
			<div className="d-none d-sm-flex gap-1">
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

			{/* Dropdown menu for small screens */}
			<div className=" d-sm-none d-flex gap-2 align-items-center">
				<div className="dropdown">
					<button
						className="btn btn-warning dropdown-toggle "
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Filter
					</button>
					<ul className="dropdown-menu">
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => setFilter('all')}
							>
								All
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => setFilter('completed')}
							>
								Completed
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => setFilter('incompleted')}
							>
								Incompleted
							</a>
						</li>
					</ul>
				</div>
				<span>View: {filter}</span>
			</div>

			{/* Control buttons */}
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
