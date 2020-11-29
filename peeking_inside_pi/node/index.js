const fs = require('fs');

const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.get('/pi/:digits', (request, response) => {
    let pattern = request.params.digits;
    let index = indexOf(pattern, digits);
    if(index!=-1){
        index -= 1;
    }
    response.send({
        index: index,
        search: pattern,
    });
})

const stream = fs.createReadStream('pi-million.txt');

let digits = '';
stream.on('data', data => {
    digits+=data.toString();
});

function indexOf(pattern, string){
    //search pattern in string and return its index if it exists, else return -1;
    let start = pattern.charAt(0);
    for(let i=0; i<string.length; ++i){
        if(string.charAt(i)===start){
            let found = true;
            for(let j=1; j<pattern.length; ++j){
                if(string.charAt(i+j)!==pattern.charAt(j)){
                    found = false;
                    break;
                }
            }
            if(found){
                return i;
            }
        }
    }
    return -1;
}

stream.on('end', () => {
    console.log('million digits of pi loaded');
});

//last 10 digits in billion digits of pi --> 5275045519