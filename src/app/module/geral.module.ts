import {
  Module
} from '@nestjs/common';
import {
  GenericModel
} from './../service/generico.service';
import {
  CidadeController
} from './../controller/geral/cidade.controller';
import {
  EstadoController
} from './../controller/geral/estado.controller';
import {
  FazendaController
} from './../controller/geral/fazenda.controller';
import {
  PlantacaoController
} from './../controller/geral/plantacao.controller';
import {
  ProdutorController
} from './../controller/geral/produtor.controller';
import {
  TipoPlantacaoController
} from './../controller/geral/tipo_plantacao.controller';


@Module({
  imports: [],
  controllers: [
    CidadeController,
    EstadoController,
    FazendaController,
    PlantacaoController,
    ProdutorController,
    TipoPlantacaoController,
  ],
  providers: [GenericModel],
})
export class geralModule {}