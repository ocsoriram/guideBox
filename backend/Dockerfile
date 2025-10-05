# ビルド用（Maven + Temurin17）
FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY guidebox-backend/pom.xml ./pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -q -B dependency:go-offline
COPY  guidebox-backend/src ./src

# テストを実行しない
RUN --mount=type=cache,target=/root/.m2 mvn -q -B package -DskipTests

# 実行用（軽量 JRE）
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
