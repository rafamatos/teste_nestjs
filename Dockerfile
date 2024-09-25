# 1: Construção da imagem
FROM node:18 AS builder

# 2 Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# 3 Copie o package.json e o package-lock.json
COPY package*.json ./

# 4 Instale as dependências de desenvolvimento e produção
RUN npm install

# 5 Copie todo o código do projeto para o diretório de trabalho
COPY . .

# 6 Compile o projeto NestJS (TypeScript para JavaScript)
RUN npm run build

# 7: Imagem final para produção
FROM node:18

# 8 Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# 9 Copie os artefatos do build da etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./dist/.env
COPY --from=builder /app/.env ./.env


# 10  porta que o app vai usar 
EXPOSE 3000

# 11 Comando para iniciar a aplicação
CMD ["node", "dist/main"]
