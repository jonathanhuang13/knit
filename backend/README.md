## Getting set up

1. Install EdgeDB
2. `npx edgeql-js --target cjs`
3. `npm run dev`

## DB Migrations

**Generating migrations**

1. Edit `./dbschema/default.esdl`
2. Run `edgedb migration create`

**Executing migrations**

1. Run `edgedb migrate`
