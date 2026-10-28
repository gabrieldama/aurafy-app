# Aurafy App


Aplicativo mobile do **Aurafy**, um player de música inspirado no Spotify, feito com Expo (React Native). O app consome a API do repositório **aurafy-api**.

## Tecnologias

- Expo + React Native
- TypeScript
- Expo Router (navegação com `Stack` e `router.push`)


## Telas

| Tela | Arquivo | Endpoint consumido |
|------|---------|--------------------|
| Início (boas-vindas) | `src/app/index.tsx` | — |
| Início (abas) | `src/app/(tabs)/inicio.tsx` | — |
| Playlists | `src/app/(tabs)/playlists.tsx` | `GET /api/playlists` |
| Detalhes da playlist | `src/app/detalhes.tsx` | `GET /api/playlists/{id}` |
| Todas as músicas | `src/app/musicas.tsx` | `GET /api/musicas` |
| Tocando | `src/app/tocando.tsx` | — |

As listas mostram carregamento, mensagem de erro com o botão "Tentar Novamente" e podem ser atualizadas puxando a tela para baixo.

## Estrutura

```
```text
src
├── app
│   ├── (tabs)
│   │   ├── _layout.tsx
│   │   ├── inicio.tsx
│   │   ├── pesquisar.tsx
│   │   └── playlists.tsx
│   ├── components
│   │   ├── AdicionarNaPlaylist.tsx
│   │   ├── Cabecalho.tsx
│   │   ├── CartaoMusica.tsx
│   │   ├── CartaoPlaylist.tsx
│   │   ├── Estado.tsx
│   │   ├── LinhaMusica.tsx
│   │   └── Logo.tsx
│   ├── _layout.tsx
│   ├── detalhes.tsx
│   ├── index.tsx
│   ├── musicas.tsx
│   └── tocando.tsx
├── constants
│   └── paleta.ts
├── services
│   └── aurafy.ts
├── state
└── imagens.d.ts
```

## Como rodar

Primeiro suba a API (aurafy-api). Depois:

```bash
npm install
npx expo start
```

Para testar no celular, troque `localhost` pelo IP do computador no arquivo `src/services/aurafy.ts`.

## Protótipo

https://www.figma.com/design/65uD3qznQ2rNCgoUyu3UK6/Untitled?node-id=0-1&t=6wcefZgdHf5SSKry-1