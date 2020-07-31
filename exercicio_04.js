function Pessoa(nome, idade, animal, lugar) {
    this.nome = nome
    this.idade = idade
    this.animal = animal
    this.lugar = lugar
}

function verificaMaisNovo(pessoas) {
    let menorIdade;  
    let pessoaMaisNova;

    for (let pessoa of pessoas) {
        if (typeof menorIdade == 'undefined') {
            menorIdade = pessoa.idade
            pessoaMaisNova = pessoa
        } else {
            if (pessoa.idade < menorIdade) {
                menorIdade = pessoa.idade
                pessoaMaisNova = pessoa
            }
        }
    }

    return pessoaMaisNova
}

function checaAnimaisFavoritos(pessoas) {

    let animais = {};
    
    for (let pessoa of pessoas) {
        
        if (typeof animais[pessoa.animal] === 'undefined') {
    
            animais[pessoa.animal] = [ pessoa ]
        } else {
            animais[pessoa.animal].push(pessoa)
        }
    }

    return animais;
}

function checaLugarFavorito(pessoas) {                               

    let lugares = {};
    
    for (let pessoa of pessoas) {
        
        if (typeof lugares[pessoa.lugar] === 'undefined') {
    
            lugares[pessoa.lugar] = [ pessoa ]
        } else {
            lugares[pessoa.lugar].push(pessoa)
        }
    }

    return lugares;
}

function listaRegistros(registros) {

    let intro = document.createElement('div');
    intro.innerHTML += '<p>Esses são os registros que foram feitos:</p>'
    let lista = document.createElement('ul')

    registros.forEach( registro => {
        let item = document.createElement('li')
        item.textContent = `${registro.nome} possui ${registro.idade} anos`
        lista.appendChild(item)
    } )

    intro.appendChild(lista)

    adicionaResultado(intro)
}


document.querySelector('form').addEventListener('submit', (e) => {
    registraPessoa(e)
    limpaResultados()
    listaRegistros(registros)
    
    let maisNovo = verificaMaisNovo(registros)
    let resIdade = document.createElement('p')
    resIdade.textContent = `A pessoa mais nova é ${maisNovo.nome} com ${maisNovo.idade} anos`
    adicionaResultado(resIdade)


    let animaisFavoritos = checaAnimaisFavoritos(registros)
    Object.keys(animaisFavoritos).forEach(animal => {
        let introAnimal = document.createElement('p')
        introAnimal.textContent = `Pessoas que gostam de ${animal}: `
        adicionaResultado(introAnimal)
        
        let listaAnimal = document.createElement('ul')
        animaisFavoritos[animal].forEach( pessoa => {
            let nome = document.createElement('li')
            nome.textContent = pessoa.nome
            listaAnimal.appendChild(nome)
        })
        adicionaResultado(listaAnimal)
    })

    let lugarFavorito = checaLugarFavorito(registros)                   
    Object.keys(lugarFavorito).forEach(lugar => {
        let visitLugar = document.createElement('p')
        visitLugar.textContent = `Pessoas que gostam de ${lugar}: `
        adicionaResultado(visitLugar)
        
        let listaLugar = document.createElement('ul')
        lugarFavorito[lugar].forEach( pessoa => {
            let nome = document.createElement('li')
            nome.textContent = pessoa.nome
            listaLugar.appendChild(nome)
        })
        adicionaResultado(listaLugar)
    })
})

let registros = []

function registraPessoa(event) {
    event.preventDefault()

    let form = event.target
    let dados = new FormData(form)

    let nome = dados.get('nome')
    let idade = Number(dados.get('idade'))
    let animalFavorito = dados.get('animal')
    let lugarFavorito = dados.get('lugar')

    form.querySelectorAll('input[type=text]').forEach( campo => campo.value = '')

    let registro = new Pessoa(nome, idade, animalFavorito, lugarFavorito)

    registros.push(registro)

}

function limpaResultados() {
    document.querySelector('#resultados').innerHTML = ''
}

function adicionaResultado(elemento) {
    document.querySelector('#resultados').appendChild(elemento)
}