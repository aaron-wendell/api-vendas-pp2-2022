// importa o express e classes para tratar erro
import express, {NextFunction, Request, Response} from 'express'
// importar o arquivo de conexão com o banco de dados
import './typeorm' // acessa o arquivo index.ts
import 'express-async-errors' // acessa o arquivo index.ts

//dependencia para tratar errors no express
// cria o servidor
let servidor = express()

// converte dados da requisição para json
servidor.use(express.json()) 
// importa as rotas
import router from './routes'
import AppError from './errors/AppError'


servidor.use(router) // servidor vai usar nossas rotas
//vamos fazer a classe app error tratar erro
servidor.use((error: Error, request: Request, response: Response, next: NextFunction) =>{
    //verifica se o erro foi lancado pelo AppError
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    //erro nao foi gerado pelo AppError
    return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
    })

})
// coloca o servidor para escutar na porta 3333 e aguardar as requisições
servidor.listen(3333, () => {
    console.log('Servidor iniciado')
})