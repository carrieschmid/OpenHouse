# Stage 1: Build React app
FROM node:18-alpine AS react-build
WORKDIR /app/client-app
COPY client-app/package*.json ./
RUN npm install
COPY client-app/ ./
RUN npm run build

# Stage 2: Build .NET app
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS dotnet-build
WORKDIR /app
COPY . .
COPY --from=react-build /app/API/wwwroot/ ./API/wwwroot/
RUN dotnet publish API/API.csproj -c Release -o /app/publish

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=dotnet-build /app/publish .
COPY --from=react-build /app/API/wwwroot/ ./wwwroot/
CMD ["sh", "-c", "ASPNETCORE_URLS=http://+:$PORT dotnet API.dll"]
