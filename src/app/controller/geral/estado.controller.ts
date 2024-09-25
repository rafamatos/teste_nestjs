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
export class EstadoController {
  @ApiTags('Estado')
  @Post('geral__estado/save')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        uf: {
          type: 'string'
        },
        nome: {
          type: 'string'
        },
        id: {
          type: 'number'
        }
      },
      required: ['uf', 'nome']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async save(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {

      let model = new GenericModel('geral.estado');
      let result: any;

      let schema = Yup.object().shape({
        uf: Yup.string().required('Campo uf obrigatório'),
        nome: Yup.string().required('Campo nome obrigatório')
      });

      const {
        uf,
        nome,
        id,

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

      let EstadoRest: any;

      if (id == undefined) {
        let dto: any = {
          uf,
          nome,
          id,

        }


        result = await model.insert(dto);

      } else {

        //let dtoriginal = await model.get({});

        result = await model.update(id, {
          uf,
          nome,
          id,
        })


      }


      return response.json(result);


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Estado')
  @Post('geral__estado/get')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {

        id: {
          type: 'number'
        }
      },
      required: ['id']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado salva com sucesso.'
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

      let model = new GenericModel('geral.estado');
      let result: any;

      result = await model.get({});

      return response.json(result);


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Estado')
  @Post('geral__estado/delete')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {

        id: {
          type: 'number'
        }
      },
      required: ['id']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Estado salva com sucesso.'
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

      let model = new GenericModel('geral.estado');
      let result: any;

      result = await model.deletefisico({});

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  @ApiTags('Estado')
  @Post('geral__estado/getall')
  @ApiResponse({
    status: 200,
    description: 'Estado salva com sucesso.'
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

      let model = new GenericModel('geral.estado');
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