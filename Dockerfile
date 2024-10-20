# Use Node.js for the back-end
FROM node:14 AS backend

# Set working directory
WORKDIR /app

# Copy the server code
COPY server.js .

# Install dependencies
RUN npm install express sqlite3

# Expose the back-end port
EXPOSE 3000

# Run the back-end server
CMD ["node", "server.js"]

# Use the official Tomcat image from the Docker Hub for the front-end
FROM tomcat:9.0 AS frontend

# Remove the default webapps to clean up space
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copy the custom web application to the ROOT webapp directory
COPY . /usr/local/tomcat/webapps/ROOT

# Expose the front-end port
EXPOSE 8080

# Start Tomcat
CMD ["catalina.sh", "run"]
