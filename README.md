// npm
cd backend
npm i

cd ../

// Docker
Install Docker & docker-compose
ubuntu run: docker-compose up -d
windows: wsl -> docker-compose up -d

// Registration request
curl -v -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'

// Login request
curl -v -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'

// Change password request
curl -v -X POST http://localhost:3000/auth/change-password \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "oldPassword": "password123", "newPassword": "newpassword123"}'

// Get items list request
curl -v -X GET "http://localhost:3000/item/list?appId=730&currency=EUR"

// Purchase request  || productId from 1 to 11
curl -v -X POST http://localhost:3000/item/purchase \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "productId": 1}'
