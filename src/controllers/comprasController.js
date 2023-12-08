import Compras from "../models/Compras";
const { getCache, setCache } = require('../utils/redisUtils');

const create = async (req, res) => {
    try {
        let { produto, valor, data, id_cliente } = req.body;

        let response = await Compras.create({
            produto, valor, data, id_cliente
        });

        return res.status(200).send({
            type: 'success',
            message: `Compra registrada com sucesso`,
            data: response
        });

    } catch (error) {
        return res.status(500).send({
            type: 'error',
            message: `Erro ao registrar compra`,
            error: error.message
        });
    }
};

const get = async (req, res) => {
    try {
        let id = req.params.id;

        if (!id) {
            let response = await Compras.findAll();
            return res.status(200).send({
                type: 'success',
                message: 'Compras carregadas com sucesso',
                data: response
            });
        }

        let response = await Compras.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send({
                type: 'error',
                message: `Compra com id ${id} não encontrada`,
                data: []
            });
        }

        return res.status(200).send({
            type: 'success',
            message: 'Compra carregada com sucesso',
            data: response
        });

    } catch (error) {
        return res.status(500).send({
            type: 'error', 
            message: 'Erro ao carregar compras',
            error: error.message
        });
    }
};


async function getVendaRedis(req, res) {
    const vendaId = req.params.id;
    const cacheKey = `venda_${vendaId}`;

    // Verificar no Redis
    const cachedVenda = await getCache(cacheKey);
    if (cachedVenda) {
        return res.json(cachedVenda);
    }

    // Se não estiver no cache, buscar no banco de dados
    try {
        const venda = await Compras.findByPk(vendaId);
        if (!venda) {
            return res.status(404).json({ message: 'Venda não encontrada' });
        }

        // Armazenar no Redis e retornar
        await setCache(cacheKey, venda, 3600); // Tempo de expiração: 3600 segundos
        return res.json(venda);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar venda' });
    }
}


export default { create, get, getVendaRedis };
