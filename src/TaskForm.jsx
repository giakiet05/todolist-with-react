import { useRef, useState, useEffect } from 'react';

export default function TaskForm({ onAddTask, inputRef, text, setText }) {
	useEffect(() => {
		function handleKeyDown(e) {
			if (e.key === 'Enter') {
				onAddTask(text);
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [text]);

	return (
		<div action="" className="task-form">
			<div className="input-group">
				<input
					ref={inputRef}
					value={text}
					type="text"
					placeholder="Add a task"
					className="form-control border-3"
					onChange={(e) => setText(e.target.value)}
				/>
				<button className="btn btn-primary" onClick={() => onAddTask(text)}>
					Add
				</button>
			</div>
		</div>
	);
}
