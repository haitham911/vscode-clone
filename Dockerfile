FROM electronuserland/builder:wine-mono

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "dist"]
