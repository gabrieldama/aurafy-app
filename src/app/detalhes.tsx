import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { paleta } from '@/constants/paleta';
import { buscarPlaylist, Musica, Playlist } from '@/services/aurafy';
import { Estado } from '@/components/Estado';

function Faixa({ musica, aoTocar }: { musica: Musica; aoTocar: () => void }) {
  return (
    <Pressable style={({ pressed }) => [s.faixa, pressed && { opacity: 0.7 }]} onPress={aoTocar}>
      <View style={s.play}>
        <Ionicons name="play" size={16} color={paleta.fundo} style={{ marginLeft: 2 }} />
      </View>
      <View style={s.faixaTextos}>
        <Text style={s.faixaTitulo} numberOfLines={1}>{musica.titulo}</Text>
        <Text style={s.faixaArtista} numberOfLines={1}>{musica.artista}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color={paleta.textoSuave} />
    </Pressable>
  );
}

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [falha, setFalha] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    buscarPlaylist(id)
      .then(setPlaylist)
      .catch((e) => {
        console.error('Falha ao obter playlist:', e);
        setFalha('Não foi possível carregar os detalhes da playlist.');
      })
      .finally(() => setCarregando(false));
  }, [id]);

  const voltar = () => (router.canGoBack() ? router.back() : router.replace('/playlists'));

  const conteudo = () => {
    if (carregando) return <Estado carregando mensagem="Carregando detalhes..." />;
    if (falha || !playlist) return <Estado erro mensagem={falha ?? 'Playlist não encontrada.'} />;

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={[s.topo, { paddingTop: insets.top + 56 }]}>
          <LinearGradient colors={[paleta.destaque, paleta.fundo]} style={StyleSheet.absoluteFill} />
          <Image source={{ uri: playlist.capaUrl }} style={s.capa} />
          <Text style={s.titulo}>{playlist.nome}</Text>
          <Text style={s.descricao}>{playlist.descricao || 'Nenhuma descrição disponível.'}</Text>
        </View>

        {playlist.musicas.length === 0 && <Text style={s.vazio}>Esta playlist ainda não tem músicas.</Text>}

        {playlist.musicas.map((m) => (
          <Faixa
            key={m.id}
            musica={m}
            aoTocar={() =>
              router.push({ pathname: '/tocando', params: { id: String(m.id), playlistId: String(playlist.id) } })
            }
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={s.tela}>
      <StatusBar barStyle="light-content" />
      {conteudo()}
      <Pressable style={[s.voltar, { top: insets.top + 8 }]} onPress={voltar} hitSlop={8}>
        <Ionicons name="chevron-back" size={28} color={paleta.texto} />
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },
  voltar: { position: 'absolute', left: 12, zIndex: 10, width: 40, height: 40, justifyContent: 'center' },

  topo: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 36 },
  capa: { width: 170, height: 170, borderRadius: 2, backgroundColor: paleta.superficie, marginBottom: 24 },
  titulo: { fontSize: 24, fontWeight: '700', color: paleta.texto, marginBottom: 8 },
  descricao: { fontSize: 14, color: paleta.textoSuave, textAlign: 'center' },

  faixa: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20 },
  play: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: paleta.texto,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  faixaTextos: { flex: 1, marginRight: 12 },
  faixaTitulo: { fontSize: 16, fontWeight: '500', color: paleta.texto, marginBottom: 2 },
  faixaArtista: { fontSize: 13, color: paleta.textoSuave },
  vazio: { textAlign: 'center', color: paleta.textoApagado, marginTop: 24 },
});