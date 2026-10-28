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
| Playlists | `src/app/playlists.tsx` | `GET /api/playlists` |
| Detalhes da playlist | `src/app/detalhes.tsx` | `GET /api/playlists/{id}` |
| Todas as músicas | `src/app/musicas.tsx` | `GET /api/musicas` |

As listas mostram carregamento, mensagem de erro com o botão "Tentar Novamente" e podem ser atualizadas puxando a tela para baixo.

## Estrutura

```
src
├── app
│   ├── _layout.tsx        # Stack de navegação
│   ├── index.tsx          # Início
│   ├── playlists.tsx      # Lista de playlists
│   ├── detalhes.tsx       # Detalhes da playlist
│   └── musicas.tsx        # Lista de músicas
├── components
│   ├── CartaoPlaylist.tsx # Item da lista de playlists
│   ├── CartaoMusica.tsx   # Item da lista de músicas
│   └── Estado.tsx         # Carregamento, erro e lista vazia
├── constants
│   └── paleta.ts          # Cores do app
└── services
    └── aurafy.ts          # Chamadas à API
```

## Como executar

1. Suba a API (`aurafy-api`) na sua máquina.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o app:

```bash
npx expo start --web   # no navegador do computador
npx expo start         # no celular, lendo o QR Code com o Expo Go
```

Para rodar no celular, troque `localhost` em `src/services/aurafy.ts` pelo IP do computador (ex.: `http://192.168.0.15:8080/api`). O celular e o computador precisam estar na mesma rede Wi-Fi.

## Protótipo

O protótipo foi feito no Figma: [Aurafy no Figma](https://www.figma.com/design/65uD3qznQ2rNCgoUyu3UK6/Untitled?node-id=0-1&t=6wcefZgdHf5SSKry-1)

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

