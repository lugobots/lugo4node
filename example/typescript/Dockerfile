FROM node:18

COPY package.json       /app/package.json
COPY package-lock.json  /app/package-lock.json

RUN cd /app && npm install

COPY example/typescript/package.json        /app/example/typescript/package.json
COPY example/typescript/package-lock.json   /app/example/typescript/package-lock.json

RUN cd /app/example/typescript/ && npm install

COPY .       /app/
COPY example/typescript /app/example/typescript

WORKDIR /app/example/typescript

CMD [ "npm", "run", "start" ]

