# Stage 1: Build React app
FROM node:20 AS build

WORKDIR /app/client

# Copy client files and install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install

# Build the React app
COPY client .
RUN npm run build

# Stage 2: Build the final image
FROM node:20

WORKDIR /app

# Copy server files and install dependencies
COPY server/package.json server/package-lock.json ./
RUN npm install

# Copy the built React app from the previous stage
COPY --from=build /app/client/dist ./dist

# Copy server files
COPY server .

# Set environment variable for API URL
ARG VITE_SEARCH_API
ENV VITE_SEARCH_API=${VITE_SEARCH_API}

# Expose the port and start the server
EXPOSE 3000 80 443
CMD ["node", "server.js"]
