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
export class FazendaController {
  @ApiTags('Fazenda')
  @Post('geral__fazenda/save')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        vegetacao_hectare: {
          type: 'number'
        },
        id_produtor: {
          type: 'number'
        },
        id: {
          type: 'number'
        },
        nome: {
          type: 'string'
        },
        agricultura_hectare: {
          type: 'number'
        },
        total_hectare: {
          type: 'number'
        }
      },
      required: ['nome', 'id_produtor', 'agricultura_hectare', 'vegetacao_hectare', 'total_hectare']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Fazenda salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async save(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {

      let model = new GenericModel('geral.fazenda');
      let result: any;

      let schema = Yup.object().shape({
        vegetacao_hectare: Yup.number().nullable(),
        id_produtor: Yup.number().required('Campo id_produtor obrigatório'),
        nome: Yup.string().required('Campo nome obrigatório'),
        agricultura_hectare: Yup.number().nullable(),
        total_hectare: Yup.number().nullable(),

      });

      const {
        vegetacao_hectare,
        id_produtor,
        id,
        nome,
        agricultura_hectare,
        total_hectare,

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

      let FazendaRest: any;

      if (id == undefined) {
        let dto: any = {
          vegetacao_hectare,
          id_produtor,
          id,
          nome,
          agricultura_hectare,
          total_hectare,

        }


        result = await model.insert(dto);

      } else {

        result = await model.update(id, {
          vegetacao_hectare,
          id_produtor,
          id,
          nome,
          agricultura_hectare,
          total_hectare,
        })


      }



      return response.json(result);



    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Fazenda')
  @Post('geral__fazenda/get')
  @ApiResponse({
    status: 200,
    description: 'Fazenda salva com sucesso.'
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

      let model = new GenericModel('geral.fazenda');
      let result: any;

      result = await model.get({});

      return response.json(result);


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Fazenda')
  @Post('geral__fazenda/delete')
  @ApiResponse({
    status: 200,
    description: 'Fazenda salva com sucesso.'
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

      let model = new GenericModel('geral.fazenda');
      let result: any;

      result = await model.deletefisico({});

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  @ApiTags('Fazenda')
  @Post('geral__fazenda/getall')
  @ApiResponse({
    status: 200,
    description: 'Fazenda salva com sucesso.'
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

      let model = new GenericModel('geral.fazenda');
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