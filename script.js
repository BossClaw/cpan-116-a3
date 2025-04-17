// CPAN 116 ASSIGNMENT 9 – ARRAYS

// This assignment is based on searching for an array element.
// To complete this work, you might need to work with all types of loops you have learned so far and a data structure, array.

// [ ] The element to search is entered,
//     [X] validated
//     [X] and verified against an existing array of numbers.
//     [X] Appropriate messages are displayed if an element
//         [X] is found or
//         [X] not found.

// [X] Write the generic utility methods to validate the input numbers
//     [X] and to find an existing element from the array.

// [X] Design a method that will read a number and validate it.
//     [X] To pass the validation test, the number must be between
//         [X] lower and
//         [X] upper limit.
//         You can decide the limits (I have 100 and 1000 as lower and upper limits, check output screen shots)
//     [X] The validated number is read by another method which will verify it against an array of numbers.
//     [X] If a number is found in the array, the array is flagged to display that the element is found.
//     [X] Any number not found in the array is to be flagged as an error, not found.

// 1. In ArrayUtilities
//    [X] Make a method to validate the entered number.
//        [X] This method must take two parameters, the lower and upper limit.
//        [X] This method will accept an input/read the number and return the validated number.
//        [X] The number can be validated by using a While or Do-While loop.
//    [X] Make a method to search a number in an existing array of numbers.
//        [X] Remember, the element to be searched must be a valid number.
//        [X] This method takes three parameters, the lookup array, its size and the number to search.
//        [X] This method will return a Boolean.

// 2. In a main method test your ArrayUtilities class.
//    [X] In the ArrayUtilities class:Declare an array and set the size to user input.
//    [X] Call a method of ArrayUtilities class to fill the array with numbers. This filled array will be our lookup array for search operation.
//    [X] Call a method of ArrayUtilities class to print the numbers in an array.
//    [X] Call a method of ArrayUtilities class to display the sum of array elements.
//    [X] Call a method to return the validated number, which is passed as an argument to search method.
//    [X] Call a method to find/search the number from an array.

// [X] Match the sample run output.
// [?] Add some extras?

// ===========================================================================================
// REQUIRED FOR NODE.JS USER INPUT VIA CLI
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// ===========================================================================================
// ARRAYUTILITIES CLASS

const ArrayUtilities = {
	// FUNC TO REPEATED ASK UNTIL VALID INPUT PROVIDED
	validateNumber: async function (prompt, lower, upper) {
		let num;
		do {
			const input = await askQuestion(prompt);

			// MAKE IT A NUMBER
			num = Number(input);

			// EAL
			if (!Number.isFinite(num) || num < lower || num > upper) {
				console.log(`Invalid input ${input}! Enter a number between ${lower} and ${upper}.`);
			}
		} while (!Number.isFinite(num) || num < lower || num > upper);
		return num;
	},

	// TRY TO FIND THE NUMBER	
	searchNumber: function (arr, arr_length, numberToSearch) {
		for (let i = 0; i < arr_length; i++) {
			if (arr[i] === numberToSearch) return true;
		}

		return false;
	},

	// LOOP AND FILL AN ARRAY WITH USER INPUT
	fillArray: async function (size, lower, upper) {
		const arr = [];
		for (let i = 0; i < size; i++) {
			const num = await this.validateNumber(`Enter number (${i + 1}/${size}): `, lower, upper);
			arr.push(num);
		}
		return arr;
	},

	// PRINT-O-ARAMA
	printArray: function (arr) {
		console.log('\nElements in the array:');
		for (let num of arr) {
			console.log(num);
		}
	},

	// RETURN THE TOTAL SUM
	sumArray: function (arr) {
		return arr.reduce((sum, num) => sum + num, 0);
	},
};

// FUNC TO GET INPUT FROM COMMAND LINE
function askQuestion(query) {
	return new Promise((resolve) => rl.question(query, resolve));
}

// ===============================================================================
// MAIN METHOD / FUNC

async function main() {
	const lowerLimit = 128;
	const upperLimit = 1024;
	const max_array_size = 12;
	let size = 0;

	// GET THE SIZE
	while (size < 1) {
		let sizeInput = await askQuestion(`Enter size of array from 1 and ${max_array_size} inclusive.\n`);
		size = parseInt(sizeInput);

		let size_valid = Number.isInteger(size) && size > 0 && size <= max_array_size;

		if (!size_valid) {
			console.log(`Invalid array size.`);
		}
	}
	console.log();
	console.log(`Size of array chosen is ${size}`);
	console.log();

	// MAKE ARRAY AND LOOP GETTING USER INPUT
	const array = await ArrayUtilities.fillArray(size, lowerLimit, upperLimit);

	// PRINT IT
	ArrayUtilities.printArray(array);

	// SUM IT AND PRINT IT
	const sum = ArrayUtilities.sumArray(array);
	console.log(`\nSum of array elements: ${sum}`);

	// GET INPUT TO SEARCH AND DO SEARCH
	let do_search = true;
	let search_count = 0;
	let found_count = 0;
	let missing_count = 0;

	do {
		search_count++;

		console.log();

		const numberToSearch = await ArrayUtilities.validateNumber('Enter the number to search\n', lowerLimit, upperLimit);

		const found = ArrayUtilities.searchNumber(array, size, numberToSearch);

		if (found) {
			console.log('Element found!');
			found_count++;
		} else {
			console.log('Error!! Element not found');
			missing_count++;
		}

		// ASK TO CONTINUE
		const continue_input = await askQuestion('Search again? (Y/N)?\n');
		do_search = continue_input.toLowerCase() == 'y';
	} while (do_search);

	console.log();
	console.log(`Thanks for searching ${search_count} times.`);
	if (found_count > 0) {
		console.log(`You found ${found_count} numbers.`);
	}

	if (missing_count > 0) {
		console.log(`You did not find ${missing_count} numbers.`);
	}

	rl.close();
}

// ===============================================================================
// CALL THE MAIN FUNC TO RUN IT

main();
