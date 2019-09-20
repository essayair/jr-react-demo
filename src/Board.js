import React, { Fragment } from 'react';
import Square from './Square';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			isXNext: true,
		};
	}

	componentDidMount() {
		console.log('I am in componentDidMount');
	}

	componentDidUpdate() {
		console.log('I am in componentDidUpdate');
	}

	handleClick(i) {
		const squares = [...this.state.squares];

		if (calculateWinner(squares) || squares[i]) return;
		
		squares[i] = this.state.isXNext ? 'X' : 'O';
		this.setState(() => ({
			isXNext: !this.state.isXNext,
			squares,
		}));
	}

	renderSquare(i) {
		return (
			<Square
				onClick={() => this.handleClick(i)}
				value={this.state.squares[i]}
			/>
		);
	}

	render() {
		console.log('I am in render');

		const winner = calculateWinner(this.state.squares);
		const status = winner
			? `Winner: ${winner}`
			: `Next player: ${this.state.isXNext ? 'X' : 'O'}`;

		return (
			<div>
				<div className="status">{status}</div>
				{!winner && (
					<Fragment>
						<div className="board-row">
							{this.renderSquare(0)}
							{this.renderSquare(1)}
							{this.renderSquare(2)}
						</div>
						<div className="board-row">
							{this.renderSquare(3)}
							{this.renderSquare(4)}
							{this.renderSquare(5)}
						</div>
						<div className="board-row">
							{this.renderSquare(6)}
							{this.renderSquare(7)}
							{this.renderSquare(8)}
						</div>
					</Fragment>
				)}
			</div>
		);
	}
}

export default Board;

function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
}
