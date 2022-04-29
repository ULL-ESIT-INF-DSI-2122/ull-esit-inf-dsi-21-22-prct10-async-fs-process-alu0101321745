// cat aria.txt | grep -o aria | wc -l

import {spawn} from 'child_process';


const filename: string = process.argv[2];
const word: string = process.argv[3];

const cat = spawn('cat', [filename]);
const grep = spawn('grep', ['-o', word]);
const wc = spawn('wc', ['-l']);

cat.stdout.pipe(grep.stdin);
grep.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
    console.log(data.toString());
});

