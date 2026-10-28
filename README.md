# Aurafy App

App mobile do Aurafy feito com Expo. Ele consome a API do repositório aurafy-api.

## Telas

- Boas-vindas (`src/app/index.tsx`)
- Início (`src/app/(tabs)/inicio.tsx`) - lista de músicas com `GET /api/musicas`
- Pesquisar (`src/app/(tabs)/pesquisar.tsx`) - ainda não implementada
- Playlists (`src/app/(tabs)/playlists.tsx`) - lista de playlists com `GET /api/playlists`
- Detalhes da playlist (`src/app/detalhes.tsx`) - `GET /api/playlists/{id}`
- Tocando agora (`src/app/tocando.tsx`) - player com as músicas da playlist

## Tecnologias

- Expo + React Native
- TypeScript
- Expo Router (abas e navegação entre telas)
- @expo/vector-icons
- expo-linear-gradient

## Como rodar

Primeiro suba a API (aurafy-api). Depois:

```bash
npm install
npx expo start
```

Para testar no celular, troque `localhost` pelo IP do computador no arquivo `src/services/aurafy.ts`.

## Protótipo

https://www.figma.com/design/65uD3qznQ2rNCgoUyu3UK6/Untitled?node-id=0-1&t=6wcefZgdHf5SSKry-1
