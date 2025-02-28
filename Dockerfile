# Use Node.js as the base image
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Build the Next.js app
RUN npm run build

# Use a smaller image for production
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the built files from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set the port Next.js runs on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
