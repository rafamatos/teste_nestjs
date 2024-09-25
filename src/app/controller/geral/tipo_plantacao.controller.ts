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
export class TipoPlantacaoController {

  @ApiTags('TipoPlantacao')
  @Post('geral__tipo_plantacao/save')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number'
        },
        nome: {
          type: 'string'
        }
      },
      required: ['nome']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'TipoPlantacao salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })

  public async save(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {

      let model = new GenericModel('geral.tipo_plantacao');
      let result: any;

      let schema = Yup.object().shape({
        nome: Yup.string().required('Campo nome obrigatório')
      });

      const {
        id,
        nome,

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

      let TipoPlantacaoRest: any;

      if (id == undefined) {
        let dto: any = {
          id,
          nome,

        }


        result = await model.insert(dto);

      } else {

        //let dtoriginal = await model.get({});

        result = await model.update(id, {
          id,
          nome,
        })


      }

      if (request.body.optionx == true) {
        return response.json(result);

      } else {
        return result
      }


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('TipoPlantacao')
  @Post('geral__tipo_plantacao/get')
  @ApiResponse({
    status: 200,
    description: 'TipoPlantacao salva com sucesso.'
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

      let model = new GenericModel('geral.tipo_plantacao');
      let result: any;

      result = await model.get({});

      return response.json(result);


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('TipoPlantacao')
  @Post('geral__tipo_plantacao/delete')
  @ApiResponse({
    status: 200,
    description: 'TipoPlantacao salva com sucesso.'
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

      let model = new GenericModel('geral.tipo_plantacao');
      let result: any;

      result = await model.deletefisico({id});

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  @ApiTags('TipoPlantacao')
  @Post('geral__tipo_plantacao/getall')
  @ApiResponse({
    status: 200,
    description: 'TipoPlantacao salva com sucesso.'
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

      let model = new GenericModel('geral.tipo_plantacao');
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