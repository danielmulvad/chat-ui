# --- Base node ---
FROM node:12.1.0 as base

MAINTAINER Daniel Mulvad <daniel.mulvad@greenwavesystems.com>

ENV PATH ./node_modules/.bin:$PATH

COPY package-lock.json ./package-lock.json
COPY package.json ./package.json

# --- Install Dependencies ---
FROM base as dependencies

ENV PATH ./node_modules/.bin:$PATH
COPY . ./

# install node packages

RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM nginx:1.15.10-alpine

MAINTAINER Daniel Mulvad <daniel.mulvad@greenwavesystems.com>

RUN rm -rf /etc/nginx/conf.d

COPY conf /etc/nginx
COPY --from=base /build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
