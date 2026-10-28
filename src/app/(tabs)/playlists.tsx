import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { paleta } from '@/constants/paleta';
import { listarPlaylists, Playlist } from '@/services/aurafy';
import { Cabecalho } from '@/components/Cabecalho';
import { Estado } from '@/components/Estado';

function Topo() {
  return (
    <>
      <View style={s.curtidas}>
        <View style={s.curtidasIcone}>
          <Ionicons name="heart" size={30} color={paleta.branco} />
        </View>
        <View style={s.curtidasTextos}>
          <Text style={s.curtidasTitulo}>Músicas Curtidas</Text>
          <Text style={s.curtidasInfo}>Lista  •  10 Músicas</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={paleta.textoSuave} />
      </View>

      <View style={s.linhaTitulo}>
        <Text style={s.secao}>Playlists</Text>
        <Pressable style={s.criar} onPress={() => console.log('Criar playlist')}>
          <Ionicons name="add" size={16} color={paleta.textoSuave} />
          <Text style={s.criarTxt}>Criar Playlist</Text>
        </Pressable>
      </View>
    </>
  );
}

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
        numColumns={3}
        keyExtractor={(p) => String(p.id)}
        ListHeaderComponent={<Topo />}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [s.celula, pressed && { opacity: 0.7 }]}
            onPress={() => router.push({ pathname: '/detalhes', params: { id: String(item.id) } })}
          >
            <Image source={{ uri: item.capaUrl }} style={s.capa} />
            <Text style={s.nome} numberOfLines={1}>{item.nome}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Estado mensagem="Nenhuma playlist criada ainda." />}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={atualizando} onRefresh={puxar} colors={[paleta.destaque]} />}
      />
    );
  };

  return (
    <View style={s.tela}>
      <Cabecalho />
      {conteudo()}
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: paleta.fundo },

  curtidas: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 16 },
  curtidasIcone: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: paleta.destaque,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  curtidasTextos: { flex: 1 },
  curtidasTitulo: { fontSize: 17, fontWeight: '600', color: paleta.texto, marginBottom: 4 },
  curtidasInfo: { fontSize: 13, color: paleta.textoSuave },

  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: 8,
    marginBottom: 10,
  },
  secao: { fontSize: 22, fontWeight: '800', color: paleta.texto },
  criar: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  criarTxt: { fontSize: 13, color: paleta.textoSuave },

  celula: { width: '33.333%', padding: 6 },
  capa: { width: '100%', aspectRatio: 1, borderRadius: 2, backgroundColor: paleta.superficie, marginBottom: 8 },
  nome: { fontSize: 13, color: paleta.texto },
});