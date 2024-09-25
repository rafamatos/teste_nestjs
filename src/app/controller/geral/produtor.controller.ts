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
export class ProdutorController {

  @ApiTags('Produtor')
  @Post('geral__produtor/save')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string'
        },
        cpf_cnpj: {
          type: 'string'
        },
        id_cidade: {
          type: 'number'
        },
        id: {
          type: 'number'
        },
        id_estado: {
          type: 'number'
        }
      },
      required: []
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Produtor salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async save(@Req() request: Request, @Res() response: Response): Promise<any> {
    try {

      let model = new GenericModel('geral.produtor');
      let result: any;

      let schema = Yup.object().shape({
        nome: Yup.string().required('Campo nome obrigatório'),
        cpf_cnpj: Yup.string().required('Campo cpf_cnpj obrigatório'),
        id_cidade: Yup.number().required('Campo id_cidade obrigatório'),
        id_estado: Yup.number().required('Campo id_estado obrigatório'),

      });

      const {
        nome,
        cpf_cnpj,
        id_cidade,
        id,
        id_estado,

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

      let ProdutorRest: any;

      if (id == undefined) {
        let dto: any = {
          nome,
          cpf_cnpj,
          id_cidade,
          id,
          id_estado,

        }


        result = await model.insert(dto);

      } else {


        result = await model.update(id, {
          nome,
          cpf_cnpj,
          id_cidade,
          id,
          id_estado,
        })


      }

      return response.json(result);



    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Produtor')
  @Post('geral__produtor/get')
  @ApiResponse({
    status: 200,
    description: 'Produtor salva com sucesso.'
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

      let model = new GenericModel('geral.produtor');
      let result: any;

      result = await model.get({});

      return response.json(result);


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Produtor')
  @Post('geral__produtor/delete')
  @ApiResponse({
    status: 200,
    description: 'Produtor salva com sucesso.'
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

      let model = new GenericModel('geral.produtor');
      let result: any;

      result = await model.deletefisico({});

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  @ApiTags('Produtor')
  @Post('geral__produtor/getall')
  @ApiResponse({
    status: 200,
    description: 'Produtor salva com sucesso.'
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

      let model = new GenericModel('geral.produtor');
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