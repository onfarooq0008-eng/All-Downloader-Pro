FROM node:22-bookworm

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-is-python3 \
    ffmpeg \
    build-essential \
    sqlite3 \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip3 install --break-system-packages yt-dlp


COPY package*.json ./

# Fix npm install
RUN npm install --build-from-source

COPY . .

RUN mkdir -p downloads database public/uploads

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["npm","start"]
