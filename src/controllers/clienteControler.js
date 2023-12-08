import Cliente from "../models/Cliente";
const { getCache, setCache } = require('../utils/redisUtils');

const create = async (req, res) => {
    try {
        let { cpf, nome, endereco, cidade, uf, email } = req.body;

        let response = await Cliente.create({
            cpf, nome, endereco, cidade, uf, email
        });

        return res.status(200).send({
            type: 'success',
            message: `Cliente cadastrado com sucesso`,
            data: response
        });

    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: `Erro ao cadastrar cliente`,
            error: error.message
        });
    }
};

const get = async (req, res) => {
    try {
        let id = req.params.id;

        if (!id) {
            let response = await Cliente.findAll();
            return res.status(200).send({
                type: 'success',
                message: 'Clientes carregados com sucesso',
                data: response
            });
        }

        let response = await Cliente.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send({
                type: 'error',
                message: `Cliente com id ${id} não encontrado`,
                data: []
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Cliente carregado com sucesso',
            data: response
        });

    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: 'Erro ao carregar clientes',
            error: error.message
        });
    }
};


async function getClienteRedis(req, res) {
    const clienteId = req.params.id;
    const cacheKey = `cliente_${clienteId}`;

    // Verificar no Redis
    const cachedCliente = await getCache(cacheKey);
    if (cachedCliente) {
        return res.json(cachedCliente);
    }

    // Se não estiver no cache, buscar no PostgreSQL
    try {
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        // Armazenar no Redis e retornar
        await setCache(cacheKey, cliente, 3600); // Exemplo de tempo de expiração: 3600 segundos
        return res.json(cliente);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar cliente' });
    }
}


export default { create, get, getClienteRedis };
