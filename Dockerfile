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

RUN ["npm", "install"]
RUN ["npm", "run", "build"]

# --- Unit Testing ---
FROM dependencies as test


# --- Finale Image ---
FROM nginx:1.15.10-alpine

MAINTAINER Daniel Mulvad <daniel.mulvad@greenwavesystems.com>

RUN rm -rf /etc/nginx/conf.d

COPY conf /etc/nginx
COPY conf/conf.d/privkey.pem /etc/nginx/
COPY conf/conf.d/fullchain.pem /etc/nginx/
COPY --from=test /build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
