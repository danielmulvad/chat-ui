# --- Base node ---
FROM node:12.1.0 as base

MAINTAINER Daniel Mulvad <daniel.mulvad@greenwavesystems.com>

ENV PATH ./node_modules/.bin:$PATH

COPY . .

RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM nginx:1.15.10-alpine

MAINTAINER Daniel Mulvad <daniel.mulvad@greenwavesystems.com>

RUN rm -rf /etc/nginx/conf.d

COPY conf /etc/nginx
COPY conf/conf.d/fullchain.pem /etc/nginx/
COPY conf/conf.d/privkey.pem /etc/nginx/
COPY --from=base /build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
