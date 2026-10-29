function solvePuzzle(){

let puzzle = document.getElementById("puzzleInput").value.toUpperCase();

let words = puzzle.match(/[A-Z]+/g);

let letters = [...new Set(puzzle.replace(/[^A-Z]/g,''))];

if(letters.length > 10){
    document.getElementById("output").innerHTML = "Too many unique letters!";
    return;
}

let used = new Array(10).fill(false);
let map = {};

function wordToNumber(word){
    let num = "";
    for(let ch of word){
        num += map[ch];
    }
    return parseInt(num);
}

function dfs(index){

    if(index === letters.length){

        let sum = 0;

        for(let i=0;i<words.length-1;i++){
            sum += wordToNumber(words[i]);
        }

        let result = wordToNumber(words[words.length-1]);

        if(sum === result){
            return true;
        }

        return false;
    }

    for(let d=0; d<=9; d++){

        if(!used[d]){

            if(d === 0 && words.some(w => w[0] === letters[index])){
                continue;
            }

            map[letters[index]] = d;
            used[d] = true;

            if(dfs(index+1)) return true;

            used[d] = false;
        }
    }

    return false;
}

if(dfs(0)){

    let output = "<h3>Solution</h3>";

    for(let l of letters){
        output += l + " = " + map[l] + "<br>";
    }

    document.getElementById("output").innerHTML = output;

}
else{
    document.getElementById("output").innerHTML = "No solution found";
}

}
