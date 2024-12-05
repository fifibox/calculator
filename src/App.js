import{useState} from 'react';
import {evaluate} from 'mathjs';


function App() {
	// initialize calc to be ''
	const [calc,setCalc] = useState("");
	// initialize result to be ''
	const [result,setResult] = useState("")

	const ops = ['/','*','+','-','.']

	// function that takes value as parameter 
	const updateCalc = value => {
		if (
			// if current calc is '' and an operator is passed(clicked) 
			(ops.includes(value) && calc === '') ||
			// or if an operator is passed(clicked) and current calc ends with an operator
			(ops.includes(value) && ops.includes(calc.slice(-1)))
		){
			return;
		}
		// update calc , adding the value that is clicked 
		setCalc(calc + value);
		
		// update result if value clicked is not an operator
		if (!ops.includes(value)){
			value = evaluate(calc + value).toString()
			if (value === 'Infinity' || value === 'NaN'){
					
				setResult('0')
			}
			else{
			setResult(value)
		}
		}
	}
	
 

	// function to calculate 
	const calculate =()=>{
		if (!ops.includes(calc.slice(-1))){
			if (evaluate(calc).toString() === 'Infinity' ||  evaluate(calc).toString() === 'NaN'){
				console.log('hello')
				setCalc('0')
			} else{
				setCalc(evaluate(calc).toString())
			}
		}
	}

	// function to delete last input 
	const deleteLast =() =>{
		if (calc !==''){
			setCalc(calc.slice(0,-1))

			if (!ops.includes(calc.slice(-1))){
				if (!ops.includes(calc[calc.length-2])){
					setResult(evaluate(calc.slice(0,-1).toString()))
				} else {
					setResult(evaluate(calc.slice(0,-2).toString()))
				}
			}
		}
	}

	// function to create 1-9 buttons on the calculator
	const createDigits = () => {
		const digits = [];
		//iterate from 1 to 9
		for (let i=1; i<10; i++){
			digits.push(
			<button 
			// calls updateCal function when clicking digits 
			onClick={() => updateCalc(i.toString())}
			key={i}>{i}</button>
			)
	}
	return digits;
	}

	return (
		<div className="App">
			
			<div className="calculator">
				
				<div className="display">
					{/* if result is not '' display result, else display '' */} 
					{result ? <span>({result})</span> : '' }&nbsp; 
					{ calc || 0}
				</div>
					
				<div className="operators">
					{/* calls updateCalc function when clicking operators */} 
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>
					<button onClick={() => deleteLast()}>DEL</button>
				</div>

				<div className="digits">
				
					{/* calling createDigit function*/} 
					{createDigits()}
					<button onClick={() => updateCalc('0')}>0</button>
					<button onClick={() => updateCalc('.')}>.</button>
					<button onClick={() => calculate()}>=</button>
				</div>
			</div>
		</div>
	);
}

export default App;
