import { Injectable, NotFoundException } from '@nestjs/common';

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

@Injectable()
export class TodoService {
    private todos: Todo[] = [];
    private nextId = 1;

    getAll(): Todo[] {
        return this.todos;
    }

    getById(id: string | number): Todo {
        const nid = typeof id === 'string' ? parseInt(id, 10) : id;
        const todo = this.todos.find((t) => t.id === nid);
        if (!todo) throw new NotFoundException(`Todo with id ${nid} not found`);
        return todo;
    }

    create(createDto: any): Todo {
        const title = createDto?.title ?? 'Untitled';
        const todo: Todo = { id: this.nextId++, title, completed: !!createDto?.completed };
        this.todos.push(todo);
        return todo;
    }

    update(id: string | number, updateDto: any): Todo {
        const nid = typeof id === 'string' ? parseInt(id, 10) : id;
        const idx = this.todos.findIndex((t) => t.id === nid);
        if (idx === -1) throw new NotFoundException(`Todo with id ${nid} not found`);
        const existing = this.todos[idx];
        const updated: Todo = {
            ...existing,
            title: updateDto?.title ?? existing.title,
            completed: updateDto?.completed ?? existing.completed,
        };
        this.todos[idx] = updated;
        return updated;
    }

    delete(id: string | number): { deleted: boolean } {
        const nid = typeof id === 'string' ? parseInt(id, 10) : id;
        const idx = this.todos.findIndex((t) => t.id === nid);
        if (idx === -1) throw new NotFoundException(`Todo with id ${nid} not found`);
        this.todos.splice(idx, 1);
        return { deleted: true };
    }
}
