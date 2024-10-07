FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
COPY backend/target/FitnessTrackerApp.jar FitnessTracker.jar
ENTRYPOINT ["java", "-jar", "FitnessTracker.jar"]
