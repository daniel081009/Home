FROM node:18.11.0

COPY . .

RUN npm i


RUN npm run build

# 애플리케이션 실행
CMD [ "npm", "run","start" ]