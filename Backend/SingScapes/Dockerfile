# Use a Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build

# Set working directory inside container
WORKDIR /app

# Copy pom.xml and download dependencies first (cache optimization)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of your project and build it
COPY . .
RUN mvn clean package -DskipTests

# Use a smaller JDK base image to run the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Set port (optional, for documentation)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
