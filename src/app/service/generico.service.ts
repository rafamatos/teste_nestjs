import { db } from '../../db/knex';
import { Injectable, Optional, Inject } from '@nestjs/common';


require('dotenv').config();
let envdebug: any = process.env.querydebug || false;

interface Request {
    param: any;
    pista: string;
    campos: Array<string>;
    filtros: any;
}
@Injectable()
export class GenericModel {

    //private table: string;
    constructor(@Optional() private table: string) {
        this.table = table;
    }

    // Método getAll com busca utilizando LIKE em uma ou mais colunas e parâmetro fixo
    public async getall({ param, pista, campos, filtros }: Request): Promise<any[]> {

        console.log('colunas::', param, pista, campos, filtros);

        try {

            let letwhere: any = {};
            if (param.ativo_logico == true) {
                letwhere.ativo_logico = true;
            }
            if (param.id) {
                letwhere.id = param.id;
            }

            if (campos == undefined) {
                campos = [];
            }
            if (filtros == undefined) {
                filtros = [];
            }

            let result = await db.table(this.table)
                .where((builder: any) => {
                    campos.forEach((column) => {
                        builder.orWhere(column, 'like', `${pista}%`);
                    });
                })
                .where(letwhere)
                .modify((queryBuilder: any) => {
                    if (filtros && filtros.length > 0) {
                        filtros.forEach((filtro: any) => {
                            const coluna = Object.keys(filtro)[0];
                            const valor = filtro[coluna];
                            queryBuilder.andWhere(coluna, '=', valor);
                        });
                    }
                })
                .select('*').debug(envdebug);

            //console.log('rest', );


            return result;
        } catch (error) {
            throw new Error('Erro ao obter os contatos: ' + error);
        } finally {
            //db.destroy();
        }
    };

    public async get(par: any): Promise<any[]> {

        try {
            let letwhere: any = {};

            if (par.id != undefined) {
                letwhere.id = par.id;
            }



            let result: any = db.table(this.table)
                .where(letwhere)
                .first()   
                .debug(envdebug);

            console.log('result::', letwhere, result);

            return result;

        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar registro');
        } finally {
            //db.destroy();
        }
    }

    public async list(par: any): Promise<any[]> {
        try {
            let letwhere: any = {};

            if (par.id != undefined) {
                letwhere.id = par.id;
            }

            let result = db.table(this.table)
                .where(letwhere)
                .limit(200)
                .offset(0)
                .debug(envdebug);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar registro');
        } finally {
            //db.destroy();
        }
    }

    public async insert(data: any) {
        try {
            //data.id = uuidv4()
            console.log('data::', data);

            const result = await db.table(this.table)
                .insert(data)
                .returning('*')
                .debug(envdebug);

            return result[0];
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar registro');
        } finally {
            //db.destroy();
        }
    }


    public async update(id: any, data: any) {
        try {
            const result = await db.table(this.table).where({ id }).update(data).debug(envdebug);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar registro');
        } finally {
            //db.destroy();
        }
    }


    public async updateAlteranativo(chave: any, data: any) {
        try {
            const result = await db.table(this.table).where(chave).update(data).debug(envdebug);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao criar registro');
        } finally {
            //db.destroy();
        }
    }


    public async delete(par: any) {
        try {

            let letwhere: any = { ativo_logico: true };
            if (par.id != undefined) {
                letwhere.id = par.id;
            }

            let result = await db.table(this.table).where(letwhere).update({ ativo_logico: false }).debug(envdebug);
            return result;
        } catch (error: any) {
            console.error(error);
            throw new Error('Erro ao criar registro');
        } finally {
            // db.destroy();
        }
    }


    public async deletefisico(par: any) {
        try {
            let letwhere: any = {};
            if (par.id != undefined) {
                letwhere.id = par.id;
            }
            let result = await db.table(this.table).where(letwhere).del().debug(envdebug); // Utiliza 'del' para excluir fisicamente
            return result;
        } catch (error: any) {
            console.error(error);
            throw new Error('Erro ao excluir registro');
        } finally {
            // db.destroy();
        }
    }

}
