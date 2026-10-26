import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { paleta } from '@/constants/paleta';
import { buscarPlaylist, formatarDuracao, Playlist } from '@/services/aurafy';
import { CartaoMusica } from '@/components/CartaoMusica';
import { Estado } from '@/components/Estado';

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={s.linha}>
      <Text style={s.rotulo}>{rotulo}</Text>
      <Text style={s.valor}>{valor}</Text>
    </View>
  );
}

function Botao({ icone, texto, primario, onPress }: { icone: string; texto: string; primario?: boolean; onPress: () => void }) {
  const cor = primario ? paleta.branco : paleta.texto;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [s.botao, primario ? s.botaoPrimario : s.botaoSecundario, pressed && { opacity: 0.8 }]}
    >
      <Text style={[s.botaoIcone, { color: cor, fontSize: primario ? 16 : 20 }]}>{icone}</Text>
      <Text style={[s.botaoTxt, { color: cor }]}>{texto}</Text>
    </Pressable>
  );
}

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
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

  if (carregando) return <View style={s.tela}><Estado carregando mensagem="Carregando detalhes..." /></View>;
  if (falha || !playlist) return <View style={s.tela}><Estado erro mensagem={falha ?? 'Playlist não encontrada.'} /></View>;

  const duracaoTotal = playlist.musicas.reduce((total, m) => total + m.duracaoSegundos, 0);

  return (
    <View style={s.tela}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={s.banner}>
          <Image source={{ uri: playlist.capaUrl }} style={s.bannerImg} resizeMode="cover" />
        </View>

        <View style={s.corpo}>
          <Text style={s.titulo}>{playlist.nome}</Text>
          <View style={s.meta}>
            <Text style={s.metaTxt}>{`${playlist.musicas.length} músicas  ·  ${formatarDuracao(duracaoTotal)}`}</Text>
          </View>

          <Botao primario icone="▶" texto="Ouvir" onPress={() => console.log('Ouvir:', playlist.nome)} />
          <Botao icone="♡" texto="Curtir" onPress={() => console.log('Curtida:', playlist.nome)} />

          <View style={s.separador} />
          <Text style={s.cabecalho}>DESCRIÇÃO</Text>
          <Text style={s.descricao}>{playlist.descricao || 'Nenhuma descrição disponível.'}</Text>
          <View style={s.separador} />

          <Linha rotulo="Músicas" valor={String(playlist.musicas.length)} />
          <Linha rotulo="Duração" valor={formatarDuracao(duracaoTotal)} />

          <View style={s.separador} />
          <Text style={s.cabecalho}>MÚSICAS</Text>
        </View>

        {playlist.musicas.map((m) => (
          <CartaoMusica key={m.id} musica={m} />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },
  banner: {
    width: '100%',
    height: 240,
    backgroundColor: paleta.superficie,
    borderBottomWidth: 1.5,
    borderBottomColor: paleta.bordaForte,
  },
  bannerImg: { width: '100%', height: '100%' },
  corpo: { paddingTop: 16, paddingHorizontal: 16 },
  titulo: { fontSize: 32, fontWeight: '900', letterSpacing: -0.5, color: paleta.texto, marginBottom: 8 },
  meta: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  metaTxt: { fontSize: 15, fontWeight: '500', color: paleta.textoSuave },
  botao: { height: 50, borderRadius: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  botaoPrimario: { backgroundColor: paleta.destaque, marginBottom: 12 },
  botaoSecundario: { backgroundColor: paleta.chip, borderWidth: 1.5, borderColor: paleta.bordaForte, marginBottom: 16 },
  botaoIcone: { marginRight: 10, fontWeight: '600' },
  botaoTxt: { fontSize: 18, fontWeight: '800' },
  separador: { height: 1.5, marginVertical: 16, backgroundColor: paleta.bordaForte },
  cabecalho: { fontSize: 14, fontWeight: '800', letterSpacing: 0.5, color: paleta.texto, marginBottom: 10, marginTop: 4 },
  descricao: { fontSize: 15, lineHeight: 22, color: paleta.linha, marginBottom: 4 },
  linha: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  rotulo: { width: 90, fontSize: 15, fontWeight: '500', color: paleta.textoApagado },
  valor: { flex: 1, fontSize: 15, fontWeight: '600', color: paleta.texto },
});
