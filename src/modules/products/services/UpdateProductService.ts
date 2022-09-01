import { getCustomRepository } from "typeorm";
import AppError from "../../../errors/AppError";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";

// cria um tipo de dado
interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
class UpdateProductService{
    public async execute({id, name, price, quantity}: IRequest): Promise<Product>{
        const productRepository = getCustomRepository(ProductRepository);
        //verifica se product Exists
        const productExists = await productRepository.findOne(name);
        if(!productExists){
            throw new AppError('Produto não encontrado', 400);
        }
        //verifica se nome alterado ja existe no banco de dados
        const nameExists = await productRepository.findOne(name);
        if(nameExists){
            throw new AppError('Nome do produto já existe', 400);
        }
        //lets us update the product
        productExists.name = name
        productExists.price = price
        productExists.quantity = quantity
        await productRepository.save(productExists);
        return productExists;
    }
}

export default UpdateProductService;