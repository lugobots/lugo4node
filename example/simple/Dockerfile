FROM node:18

COPY package.json       /app/package.json
COPY package-lock.json  /app/package-lock.json

RUN cd /app && npm install

COPY example/simple/package.json        /app/example/simple/package.json
COPY example/simple/package-lock.json   /app/example/simple/package-lock.json

RUN cd /app/example/simple/ && npm install

COPY .       /app/
COPY example/simple /app/example/simple

WORKDIR /app/example/simple

CMD [ "npm", "run", "start" ]

