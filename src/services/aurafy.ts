// No celular, troque "localhost" pelo IP do computador (ex.: http://192.168.0.15:8080/api)
const BASE = 'http://localhost:8080/api';

export type Musica = {
  id: number;
  titulo: string;
  artista: string;
  album: string;
  duracaoSegundos: number;
  capaUrl: string;
};

export type Playlist = {
  id: number;
  nome: string;
  descricao: string;
  capaUrl: string;
  musicas: Musica[];
};

async function pegar<T>(url: string): Promise<T> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Servidor respondeu com status ${resp.status}`);
  return resp.json();
}

export const listarMusicas = () => pegar<Musica[]>(`${BASE}/musicas`);

export const listarPlaylists = () => pegar<Playlist[]>(`${BASE}/playlists`);

export const buscarPlaylist = (id: string | number) => pegar<Playlist>(`${BASE}/playlists/${id}`);

export const formatarDuracao = (segundos: number) =>
  `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`;
