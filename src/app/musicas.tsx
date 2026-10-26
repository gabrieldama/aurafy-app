import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { paleta } from '@/constants/paleta';
import { listarMusicas, Musica } from '@/services/aurafy';
import { CartaoMusica } from '@/components/CartaoMusica';
import { Estado } from '@/components/Estado';

export default function Musicas() {
  const [lista, setLista] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const carregar = useCallback(
    () =>
      listarMusicas()
        .then((dados) => {
          setLista(dados);
          setFalha(null);
        })
        .catch((e) => {
          console.error('Falha ao obter músicas:', e);
          setFalha('Não foi possível carregar as músicas. Verifique se a API está rodando.');
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
    if (carregando) return <Estado carregando mensagem="Carregando músicas..." />;
    if (falha) return <Estado erro mensagem={falha} aoTentar={tentarDeNovo} />;
    return (
      <FlatList
        data={lista}
        keyExtractor={(m) => String(m.id)}
        renderItem={({ item }) => <CartaoMusica musica={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={atualizando} onRefresh={puxar} colors={[paleta.destaque]} />
        }
        ListEmptyComponent={<Estado mensagem="Nenhuma música encontrada." />}
      />
    );
  };

  return (
    <View style={s.tela}>
      <Text style={[s.faixa, s.marca]}>aurafy</Text>
      <Text style={[s.faixa, s.secao]}>Escutar Agora</Text>
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
  secao: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: paleta.borda,
    fontSize: 22,
    fontWeight: '800',
    color: paleta.texto,
  },
});
