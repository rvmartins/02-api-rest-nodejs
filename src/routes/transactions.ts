import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { request } from 'node:http'


export async function transactionRoutes(app: FastifyInstance){
    // app.get('/hello', async () => {
    //     // const tables = await knex('sqlite_schema').select('*')
    //     // return tables
        
    //     // const transaction = await knex('transactions').insert({
    //     //     id: crypto.randomUUID(),
    //     //     title: 'Transação de teste',
    //     //     amount: 1000
    //     // }).returning('*')
    //     const transaction = await knex('transactions').select('*')
    
    //     return transaction
    // })

    app.get('/', async (request) => {
        const { sessionId } = request.cookies

        const transactions = await knex('transactions')
            .where('session_id', sessionId)
            .select('*')

        return { transactions }
    })

    app.get('/:id', async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const { sessionId } = request.cookies

        const transaction = await knex('transactions')
            .where({
                session_id: sessionId,
                id
            })
            .first()

        return { transaction }
    })

    app.get('/summary', async (request) => {
        const { sessionId } = request.cookies

        const summary = await knex('transactions')
            .where('session_id', sessionId)
            .sum('amount', { as: 'amount' })
            .first()

        return { summary }
    })

    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const {title, amount, type } = createTransactionBodySchema.parse(
            request.body
        )

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
            })
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId,
        })

        return reply.status(201).send()
    })

}