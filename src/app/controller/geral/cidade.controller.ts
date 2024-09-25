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
export class CidadeController {

  @ApiTags('Cidade')
  @Post('geral__cidade/save')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: {
          type: 'string'
        },
        id_estado: {
          type: 'number'
        },
        id: {
          type: 'number'
        }
      },
      required: [ 'nome', 'id_estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Cidade salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async save(@Req() request: Request, @Res() response: Response): Promise < any > {
    try {

      let model = new GenericModel('geral.cidade');
      let result: any;

      let schema = Yup.object().shape({
        nome: Yup.string().required('Campo nome obrigatório'),
        id_estado: Yup.number().required('Campo id_estado obrigatório'),
      
      });

      const {
        nome,
        id_estado,
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

      let CidadeRest: any;

      if (id == undefined) {
        let dto: any = {
          nome,
          id_estado,
          id,

        }


        result = await model.insert(dto);

      } else {

        //let dtoriginal = await model.get({});

        result = await model.update(id, {
          nome,
          id_estado,
          id,
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


  @ApiTags('Cidade')
  @Post('geral__cidade/get')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number'
        }
      },
      required: [ 'id']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Cidade salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async get(@Req() request: Request, @Res() response: Response): Promise < Response > {

    try {

      const {
        id
      } = request.body;

      let model = new GenericModel('geral.cidade');
      let result: any;

      result = await model.get({id});

      console.log('result::', result);
      
      return response.status(200).json(result);


    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }


  @ApiTags('Cidade')
  @Post('geral__cidade/delete')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number'
        }
      },
      required: [ 'id']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Cidade salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async deletefisico(@Req() request: Request, @Res() response: Response): Promise < Response > {

    try {

      const {
        id
      } = request.body;

      let model = new GenericModel('geral.cidade');
      let result: any;

      result = await model.deletefisico({});

      return response.json(result);
    } catch (err: any) {
      return response.status(400).json({
        error: err.message
      });
    }
  }

  @ApiTags('Cidade')
  @Post('geral__cidade/getall')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pista: {
          type: 'string'
        },
        param: {
          type: 'array'
        },
        campos: {
          type: 'array'
        },
        filtros: {
          type: 'array'
        }
      },
      required: [ 'nome', 'id_estado']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Cidade salva com sucesso.'
  })
  @ApiResponse({
    status: 400,
    description: 'Erro na validação dos dados.'
  })
  public async getall(@Req() request: Request, @Res() response: Response): Promise < Response > {
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

      let model = new GenericModel('geral.cidade');
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