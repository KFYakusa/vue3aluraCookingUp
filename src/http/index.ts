import type ICategoria from "@/interfaces/ICategoria"
import type IReceita from "@/interfaces/IReceita"

async function obterDadosURL<T>(url:string){
    const response = await fetch(url)
    return response.json() as T
}

export async function obterCategorias(){
    return obterDadosURL<ICategoria[]>('https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/bf463b47860043da3b3604ca60cffc3ad1ba9865/categorias.json')
}

export async function obterReceitas(ingredientes:string[]){
    const response = await obterDadosURL<IReceita[]>('https://gist.githubusercontent.com/antonio-evaldo/002ad55e1cf01ef3fc6ee4feb9152964/raw/bf463b47860043da3b3604ca60cffc3ad1ba9865/receitas.json')

    //* realizando filtragem direto no retorno do  backend já que o backend não faz o filtro
    const filtradas = response.filter(receipt =>
        receipt.ingredientes.every(ingrediente => ingredientes.includes(ingrediente))
    )
    return filtradas;
}