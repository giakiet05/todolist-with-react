export default function ControlButtons({ onDeleteAll, onCheckAll, setFilter }) {
	return (
		<div className="d-flex justify-content-between">
			<div className="d-flex gap-1 ">
				<button className="btn btn-dark" onClick={() => setFilter('all')}>
					All
				</button>
				<button className="btn btn-info" onClick={() => setFilter('completed')}>
					Completed
				</button>
				<button
					className="btn btn-warning"
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
