FROM node:12-alpine 
RUN mkdir -p /usr/src/app/getir-case-study/
WORKDIR /usr/src/app/getir-case-study/
COPY package.json docker-entrypoint.sh /usr/src/app/getir-case-study/
RUN npm install
COPY ./ /usr/src/app/getir-case-study/
EXPOSE 5071
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
CMD [ "docker-entrypoint.sh"]