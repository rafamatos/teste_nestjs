import * as Yup from 'yup';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  v4 as uuidv4
} from 'uuid';
import {
  yupUtils
} from './../../../util/yup.utils';
import {
  GenericModel
} from './../../service/generico.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Res
} from '@nestjs/common';
import {
  Request,
  Response
} from 'express';


@Controller()
export class PlantacaoController {
  @ApiTags('Plantacao')
  @Post('geral__plantacao/save')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id_fazenda: {
          type: 'number'
        },
        id: {
          type: 'number'
        },
        id_tipo: {
          type: 'number'
        },
        cultivo_hectare: {
          type: 'number'
        },
        descricao: {
          type: 'string'
        }
      },
      required: ['id_fazenda', 'id_tipo', 'cultivo_hectare']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Plantacao salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async save(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {

      let model = new GenericModel('geral.plantacao');
      let result: any;

      let schema = Yup.object().shape({
        id_fazenda: Yup.number().nullable(),
        id_tipo: Yup.number().nullable(),
        cultivo_hectare: Yup.number().nullable(),
        descricao: Yup.string().nullable(),

      });

      const {
        id_fazenda,
        id,
        id_tipo,
        cultivo_hectare,
        descricao,

      } = request.body;

      let valido = await schema.validate(request.body, {
        abortEarly: false
      })
        .then((sucesso: any) => {
          return undefined;
        })
        .catch((erros: any) => {
          return erros.errors
        });

      if (JSON.stringify(valido) !== "{}" && valido != undefined) {
        return response.json({
          erro: valido,
          origem: "yup"
        })
      }

      let PlantacaoRest: any;

      if (id == undefined) {
        let dto: any = {
          id_fazenda,
          id,
          id_tipo,
          cultivo_hectare,
          descricao,

        }


        result = await model.insert(dto);

      } else {


        result = await model.update(id, {
          id_fazenda,
          id,
          id_tipo,
          cultivo_hectare,
          descricao,
        })


      }

      return response.json(result);




    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Plantacao')
  @Post('geral__plantacao/get')
  @ApiResponse({
    status: 200,
    description: 'Plantacao salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async get(@Req() request: Request, @Res() response: Response): Promise<Response> {

    try {

      const {
        id
      } = request.body;

      let model = new GenericModel('geral.plantacao');
      let result: any;

      result = await model.get({});

      return response.json(result);


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Plantacao')
  @Post('geral__plantacao/delete')
  @ApiResponse({
    status: 200,
    description: 'Plantacao salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async deletefisico(@Req() request: Request, @Res() response: Response): Promise<Response> {

    try {

      const {
        id
      } = request.body;

      let model = new GenericModel('geral.plantacao');
      let result: any;

      result = await model.deletefisico({});

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  @ApiTags('Plantacao')
  @Post('geral__plantacao/getall')
  @ApiResponse({
    status: 200,
    description: 'Plantacao salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async getall(@Req() request: Request, @Res() response: Response): Promise<Response> {
    try {

      const {
        param,
        pista,
        campos,
        filtros
      } = request.body;

      let schema = Yup.object().shape({

      });

      let valido = await schema.validate(param, {
        abortEarly: false
      })
        .then((sucesso: any) => {
          return undefined;
        })
        .catch((erros: any) => {
          return erros.errors
        });

      if (JSON.stringify(valido) !== "{}" && valido != undefined) {
        return response.json({
          erro: valido,
          origem: "yup"
        })
      }

      let model = new GenericModel('geral.plantacao');
      let result: any;

      result = await model.getall({
        param,
        pista,
        campos,
        filtros
      });

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }



}