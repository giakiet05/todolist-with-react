function Header({ tasks, completedTasks }) {
	let percent = (completedTasks.length * 100) / tasks.length;
	if (isNaN(percent)) percent = 0;

	return (
		<header className="bg-success rounded-top text-light p-3 mb-4 d-flex justify-content-around align-items-center">
			<div className="progress-container">
				<h1 className="text-light">To-do List</h1>
				<div className="progress" role="progressbar">
					<div
						className="progress-bar bg-info"
						style={{ width: `${percent}%` }}
					></div>
				</div>
			</div>

			<div
				className="progress-count rounded-circle bg-info d-flex align-items-center justify-content-center"
				style={{ width: 70, height: 70 }}
			>
				<h1 className="text-dark">
					{completedTasks.length}/{tasks.length}
				</h1>
			</div>
		</header>
	);
}

export default Header;
