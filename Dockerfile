FROM node:13.8.0-alpine3.10

WORKDIR /vogi

COPY package.json package.json* ./
COPY client/package.json client/package.json* ./client/

COPY . .

# Install and build parallel client
RUN cd client \
    && npm install --no-optional \
    && npm cache clean --force \
    && npm run build \
    && cd ..

# Install server dependencies
RUN npm install --no-optional && npm cache clean --force

# Set environment varables passed in from cloud provider
ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

CMD ["npm", "start"]