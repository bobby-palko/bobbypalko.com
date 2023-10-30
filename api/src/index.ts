import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';

const app = new Hono();
const prisma = new PrismaClient();

app.get('/', (c) => c.text('Hello World!!'));
app.get('/user', async (context) => {
  const allUsers = await prisma.user.findMany({
    include: { profile: true },
  });
  return context.json(allUsers, 200);
});
app.notFound((context) =>
  context.json({ message: 'Not Found', ok: false }, 404)
);

serve(app);
