import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    // you don't need to create the object to use the class components (dependency injection to use the components from other files)
   constructor(private readonly todoService: TodoService) {}

    @Get()
    getAll() {
        return this.todoService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.todoService.getById(id);
    }

    @Post()
    create(@Body() createDto: any) {
        return this.todoService.create(createDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: any) {
        return this.todoService.update(id, updateDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.todoService.delete(id);
    }
}
