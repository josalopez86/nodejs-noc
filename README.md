# NOC Project

Project using clean architecture with Typescript.
MongoDB and Postgres databases.
Using mongoose to connect with MongoDB and Prisma to connect with Postgres

#dev
1. Clone .env.template and rename it .env
2. Config environment variables
3. Install dependencies `npm install`
4. Create databases `docker compose up -d`
5. Execute `npm run dev`


#prima
Install prisma
1. npm install prisma @types/node @types/pg --save-dev
2. npx prisma init --datasource-provider PostgreSQL
3. Config batabase_url and create models
4. npx prisma migrate dev --name init
5.
6.