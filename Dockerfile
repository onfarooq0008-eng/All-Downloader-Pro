FROM node:22-bookworm

# Install ffmpeg and yt-dlp
RUN apt-get update && \
    apt-get install -y ffmpeg python3 python3-pip && \
    pip3 install --break-system-packages yt-dlp && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p downloads database public/uploads

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["npm", "start"]
