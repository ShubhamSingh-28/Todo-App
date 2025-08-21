 import { ConvexError, v } from "convex/values";
import { mutation, query} from "./_generated/server";


export const getTodos = query({
  // Your database query logic here
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

export const addTodo = mutation({
    args:{text:v.string()},
    handler: async (ctx, args) => {
        const newTodo = await ctx.db.insert("todos", {
            text: args.text,
            isComplete: false,
        });
        return newTodo;
    },
});

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get( args.id);
        if (!todo) throw new ConvexError("Todo not found");
        await ctx.db.patch( args.id, {
            isComplete: !todo.isComplete,
        });
    },
 });

 export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        await ctx.db.delete( args.id);
    },
});

export const updateTodo = mutation({
    args: { id: v.id("todos"), text: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch( args.id, {
            text: args.text,
        });
    },
});
export const clearCompletedTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }
        return { deletedCount: todos.length }; // Return the number of deleted todos
    },
});
