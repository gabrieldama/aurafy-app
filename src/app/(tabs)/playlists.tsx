import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { paleta } from '@/constants/paleta';
import { listarPlaylists, Playlist } from '@/services/aurafy';
import { CartaoPlaylist } from '@/components/CartaoPlaylist';
import { Estado } from '@/components/Estado';

export default function Playlists() {
  const [lista, setLista] = useState<Playlist[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const carregar = useCallback(
    () =>
      listarPlaylists()
        .then((dados) => {
          setLista(dados);
          setFalha(null);
        })
        .catch((e) => {
          console.error('Falha ao obter playlists:', e);
          setFalha('Não foi possível carregar as playlists. Verifique se a API está rodando.');
        })
        .finally(() => {
          setCarregando(false);
          setAtualizando(false);
        }),
    [],
  );

  useEffect(() => {
    carregar();
  }, [carregar]);

  const puxar = () => {
    setAtualizando(true);
    carregar();
  };

  const tentarDeNovo = () => {
    setCarregando(true);
    carregar();
  };

  const conteudo = () => {
    if (carregando) return <Estado carregando mensagem="Carregando playlists..." />;
    if (falha) return <Estado erro mensagem={falha} aoTentar={tentarDeNovo} />;
    return (
      <FlatList
        data={lista}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <CartaoPlaylist
            playlist={item}
            onPress={() => router.push({ pathname: '/detalhes', params: { id: String(item.id) } })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={atualizando} onRefresh={puxar} colors={[paleta.destaque]} />
        }
        ListEmptyComponent={<Estado mensagem="Nenhuma playlist criada ainda." />}
      />
    );
  };

  return (
    <View style={s.tela}>
      <Text style={[s.faixa, s.marca]}>aurafy</Text>
      <View style={[s.faixa, s.cabecalho]}>
        <Text style={s.secao}>Playlists</Text>
        <Pressable onPress={() => router.push('/musicas')}>
          <Text style={s.link}>Todas as músicas ›</Text>
        </Pressable>
      </View>
      {conteudo()}
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },
  faixa: { paddingHorizontal: 16 },
  marca: {
    paddingVertical: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: paleta.bordaForte,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    color: paleta.destaque,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: paleta.borda,
  },
  secao: { fontSize: 22, fontWeight: '800', color: paleta.texto },
  link: { fontSize: 15, fontWeight: '600', color: paleta.textoSuave },
});
