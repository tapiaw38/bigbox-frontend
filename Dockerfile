# build environment
FROM node:12.2.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn install
COPY . /app
RUN yarn build

# production environment
FROM steebchen/nginx-spa
WORKDIR /app
COPY --from=build /app/dist ./

EXPOSE 80
CMD ["nginx"]
