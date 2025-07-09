import * as process from 'process';

process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    console.log(`Received input: ${input}`);

    // Process the input as needed
    // For example, you could parse it, validate it, or perform some action based on it
    if (input === 'exit') {
        console.log('Exiting process...');
        process.exit(1);
    } else {
        console.log(`You entered: ${input}`);
    }
});