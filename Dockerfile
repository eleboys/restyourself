FROM node:6

RUN git clone https://bg.nima@gitlab.com/bg.nima/restyourself.git

WORKDIR /restyourself

RUN npm install

RUN npm install bower gulp --global

RUN bower install --allow-root

EXPOSE 8989 3100

CMD ["gulp", "dist", "--localip=178.62.252.62"];
