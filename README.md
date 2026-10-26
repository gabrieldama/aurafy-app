# Aurafy App

App mobile do Aurafy feito com Expo. Ele consome a API do repositório aurafy-api.

## Telas

- Início
- Playlists (`GET /api/playlists`)
- Detalhes da playlist (`GET /api/playlists/{id}`)
- Músicas (`GET /api/musicas`)

## Como rodar

Primeiro suba a API (aurafy-api). Depois:

```bash
npm install
npx expo start
```

Para testar no celular, troque `localhost` pelo IP do computador no arquivo `src/services/aurafy.ts`.

## Protótipo

https://www.figma.com/design/65uD3qznQ2rNCgoUyu3UK6/Untitled?node-id=0-1&t=6wcefZgdHf5SSKry-1
