# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies - clean and consistent dependency installation:
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Set the command to serve the build
CMD ["serve", "-s", "dist", "-l", "3000"]

# Expose port 3000
EXPOSE 3000