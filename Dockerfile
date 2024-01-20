FROM docker.io/node
WORKDIR /app
# cache dir /app/node_modules/@xenova/transformers/.cache
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
CMD node index.mjs
