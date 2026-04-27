import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { SearchInventoryDto } from './dto/search-inventory.dto';
import { FilterInventoryDto } from './dto/filter-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  /*
  @Get()
  findAll(@Query() filter?: InventoryParamsDto) {
    return this.inventoryService.findAll(
      filter?.status,
      filter?.location,
      filter?.sort,
      filter?.order,
    );
  }*/

  @Get()
  findAllPaginated(@Query() query: FilterInventoryDto) {
    return this.inventoryService.findAllPaginated(
      query.limit,
      query.offset,
      query?.status,
    );
  }

  @Get('search')
  searchInventory(@Query() query: SearchInventoryDto) {
    return this.inventoryService.searchInventory(query.product);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.inventoryService.remove(id);
  }
}
