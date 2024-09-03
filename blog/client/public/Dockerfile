# Use an existing docker image
FROM node:alpine

# copies packagejson and index files to image FS
WORKDIR /usr/app
COPY package.json package-lock.json ./
# Download and install dependency
RUN npm install
COPY ./ ./



# Default command
CMD ["npm", "start"]

