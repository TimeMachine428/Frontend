FROM node:7.8.0

ADD . /code/
WORKDIR /code/

RUN npm install
EXPOSE 8080
CMD npm run postinstall
CMD npm run dev

