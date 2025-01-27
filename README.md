# Frontend for Story Generation AI
Frontend for AI-powered app that creates engaging stories with both text and corresponding images. Using advanced language and image generation models, the app crafts unique narratives while generating visually captivating illustrations for each section of the story.\
Backend code can be found here: [Backend](https://github.com/nay0101/story-gen-ai-backend)\
Demo app can be accessed here: [Demo App](http://3.105.212.81:3000/)

## Run with Local Setup

### Prerequisite
* Node.js (v22 or later)

### Installation
```
npm insall
```

### Prepare .env
Create .env
```
cp .env.example .env
```
Update the API_ENDPOINT in .env
```
API_ENDPOINT=[Insert endpoint from backend api]
```

### Run the app
Development
```
npm run dev
```
Production
```
npm run prod
```

## Run with Docker
### Prepare .env
Create .env
```
cp .env.example .env
```
Update the API_ENDPOINT in .env
```
API_ENDPOINT=[Insert endpoint from backend api]
```

### Run with docker compose
```bash
docker-compose up -d
```

**Now, the app can be accessed at http://localhost:3000**
