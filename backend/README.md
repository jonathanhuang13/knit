## Getting set up

1. `docker-compose up -d`
2. `npm install`
3. `npx prisma db push`
4. `npx prisma db seed`
5. `npm run dev`
6. Now, you can go to `localhost:4001` and you should see the GraphQL playground

## Seeding and re-seeding the DB

While in development, there's no need to keep track of migrations so we can use the following commands to get the latest schema into our DB:

```
npx prisma db push
npx prisma db seed
```

Once in production, we should run:

```
npx prisma migrate dev    # migrate up
npx prisma migrate reset  # resets DB and seeds
```
