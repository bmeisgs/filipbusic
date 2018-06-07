let int = 2;
let boolean = true;
let string = "IBO";

let array = [int, boolean, string];

let object = {int: int, boolean: boolean, string: string};

for (i=2;i>-1;i--){
    console.log(array[i]);
}

for (i=0;i<3;i++){
    console.log(Object.keys(object)[i] + ' : ' + object[Object.keys(object)[i]]);
}