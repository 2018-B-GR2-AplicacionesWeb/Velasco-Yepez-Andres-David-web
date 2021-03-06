// npm install rxjs
// 02-observables


// No se puede const rxjs = require();

declare var require:any;
const concat = require('rxjs/operators').concat;
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const distinct = require('rxjs/operators').distinct;


const numeros$ =rxjs.of(
    1,
    true,
    2,
    2,
    'Andres',
    {nombre:'Andres'},
    ['oli'],
    2,
    2,
    3,
    5,
    ()=>{}
); // Con el $ al final del nombre

numeros$
    .pipe(
        distinct(), // Para que no se repitan los valores

        map(
            (valorActual)=>{
                return {
                  data:valorActual
                };
            }
        )
    )
    .subscribe(
        (ok)=>{  // Cuando esta bien
            console.log('En ok',ok);
        },
        (error)=>{ // Cuando esta mal
            console.log('Error:',error)
        },
        ()=>{  //Cuando se completa
            console.log('Complete')
        },


    );

const promesita =(funciona:boolean):Promise<string>=>{
    // @ts-ignore
    return new Promise(
        (resolve,reject)=>{
            if (funciona) {
                resolve(' :) ');
            }else {
                reject(' :(  ');
            }
        }
    );
};

const promesita$ = rxjs.from(promesita(true)); // Transformamos nuestra promesa a observable
promesita$
    .subscribe(
        (ok)=>{
            console.log('Promesita bien ',ok)
        },
        (error)=>{
            console.log('Promesita mal ',error)
        },
        ()=>{
            console.log('Completado')
        }

    )

const observableConcatenado$ = numeros$
                    .pipe(
                        concat(promesita$),
                        distinct(),
                        map(
                            (value)=>{
                                return {datos:value}
                            }
                        )
                    );
promesita$

    .pipe(
        map(
            (valor)=>{
                return {datos:valor}
            }
        )
    )
    .subscribe(

        (ok)=>{
        console.log('Concatenado bien ',ok)
        },
        (error)=>{
            console.log('Error',error);
        },
        ()=>{
            console.log('Completado')
        }
);

//inquierer js