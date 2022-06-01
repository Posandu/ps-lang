import fs from "fs";

const code = fs.readFileSync(process.argv[2] || "helloworld.ps", "utf8");

const lex = () => {
	let i = 0;
	let tokens = [];

	while (i <= code.length) {
		const char = code[i];

		if (char === "#") {
			while (code[i] !== "\n" && i < code.length) {
				i++;
			}

			continue;
		}

		if (char == "!") {
			// PushStack token
			let value = "";

			i++;

			while (/[0-9]/.test(code[i])) {
				value += code[i];
				i++;
			}

			tokens.push({
				type: "PushStack",
				value: value,
			});
		}

		if (char === "%") {
			// PopStack token
			let value = "";

			i++;

			while (/[0-9]/.test(code[i])) {
				value += code[i];
				i++;
			}

			tokens.push({
				type: "PopStack",
				index: value,
			});
		}

		if (char === "^") {
			// PopStackValue token
			let value = "";

			i++;

			while (code[i] !== "^" && i < code.length) {
				value += code[i];
				i++;
			}

			tokens.push({
				type: "PopStackValue",
				value: value,
			});
		}

		if (char === "*") {
			// PrintStack token
			let value = "";

			i++;

			if (code[i] === "*") {
				i++;

				while (/[0-9]/.test(code[i])) {
					value += code[i];
					i++;
				}

				tokens.push({
					type: "PrintStackASCII",
					value: value.trim() || "ALL",
				});
			} else {
				while (/[0-9]/.test(code[i])) {
					value += code[i];
					i++;
				}

				tokens.push({
					type: "PrintStack",
					index: value.trim() || "ALL",
				});
			}
		}

		i++;
	}

	return tokens;
};

const write = (str) => process.stdout.write(str);

const interpret = (tokens) => {
	let stack = [];

	const push = (val) => stack.push(val);
	const removeIndex = (index) => stack.splice(index, 1);
	const removeValues = (value) =>
		(stack = stack.filter((val) => val !== value));
	const printIndex = (index) => write(stack[index]);
	const printASCIIindex = (index) => write(String.fromCharCode(stack[index]));

	tokens.forEach((token) => {
		switch (token.type) {
			case "PushStack":
				push(token.value);
				break;
			case "PopStack":
				removeIndex(token.index);
				break;
			case "PopStackValue":
				removeValues(token.value);
				break;
			case "PrintStack":
				if (token.index === "ALL") {
					write(stack.join``);
				} else {
					printIndex(token.index);
				}
				break;
			case "PrintStackASCII":
				if (token.value === "ALL") {
					write(stack.map((val) => String.fromCharCode(val)).join``);
				} else {
					printASCIIindex(token.value);
				}
		}
	});

	return stack;
};

const stack = interpret(lex(code));
