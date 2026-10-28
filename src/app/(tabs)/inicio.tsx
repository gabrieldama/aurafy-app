import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { paleta } from '@/constants/paleta';
import { listarMusicas, Musica } from '@/services/aurafy';
import { Cabecalho } from '@/components/Cabecalho';
import { LinhaMusica } from '@/components/LinhaMusica';
import { Estado } from '@/components/Estado';

const GENEROS = [
    { id: 'rock', nome: 'ROCK 🔥', imagem: require('../../../assets/images/genero-rock.png') },
    { id: 'metal', nome: 'HEAVY METAL', imagem: require('../../../assets/images/genero-heavy-metal.png') },
    { id: 'sertanejo', nome: 'SERTANEJO', imagem: require('../../../assets/images/genero-sertanejo.png') },
    { id: 'samba', nome: 'SAMBA E PAGODE', imagem: require('../../../assets/images/genero-samba.png') },
];

function Banner() {
    return (
        <View style={s.banner}>
            <View style={s.bannerTextos}>
                <Text style={s.bannerTag}>Lançamento</Text>
                <View style={s.bannerTituloLinha}>
                    <Text style={s.bannerTitulo}>Happier Than Ever</Text>
                    <Ionicons name="play-circle" size={20} color={paleta.branco} style={{ marginLeft: 6 }} />
                </View>
                <Text style={s.bannerArtista}>Billie Eilish</Text>
            </View>
            <Image source={require('../../../assets/images/billie.png')} style={s.bannerImg} resizeMode="contain" />
        </View>
    );
}

function Generos() {
    return (
        <>
            <Text style={s.secao}>Gêneros</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.generos}>
                {GENEROS.map((g) => (
                    <Pressable key={g.id} style={s.genero} onPress={() => console.log('Gênero:', g.nome)}>
                        <Image source={g.imagem} style={s.generoImg} />
                        <Text style={s.generoNome}>{g.nome}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </>
    );
}

export default function Inicio() {
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
        setFalha(null);
        carregar();
    };

    const vazio = () => {
        if (carregando) return <View style={s.estado}><Estado carregando mensagem="Carregando músicas..." /></View>;
        if (falha) return <View style={s.estado}><Estado erro mensagem={falha} aoTentar={tentarDeNovo} /></View>;
        return <View style={s.estado}><Estado mensagem="Nenhuma música encontrada." /></View>;
    };

    return (
        <View style={s.tela}>
            <Cabecalho />
            <FlatList
                data={lista}
                keyExtractor={(m) => String(m.id)}
                renderItem={({ item }) => <LinhaMusica musica={item} />}
                ListHeaderComponent={
                    <>
                        <Text style={s.secao}>Músicas em alta</Text>
                        <Banner />
                        <Generos />
                        <Text style={[s.secao, { marginTop: 24 }]}>Escutar Agora</Text>
                    </>
                }
                ListEmptyComponent={vazio}
                contentContainerStyle={{ paddingBottom: 20 }}
                refreshControl={<RefreshControl refreshing={atualizando} onRefresh={puxar} colors={[paleta.destaque]} />}
            />
        </View>
    );
}

const s = StyleSheet.create({
    tela: { flex: 1, backgroundColor: paleta.fundo },

    secao: { fontSize: 20, fontWeight: '800', color: paleta.texto, paddingHorizontal: 16, marginTop: 12, marginBottom: 12 },

    banner: {
        height: 150,
        marginHorizontal: 16,
        borderRadius: 8,
        backgroundColor: paleta.destaque,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    bannerTextos: { flex: 1, padding: 16, justifyContent: 'space-between' },
    bannerTag: { fontSize: 12, color: paleta.branco, opacity: 0.85 },
    bannerTituloLinha: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
    bannerTitulo: { fontSize: 22, fontWeight: '800', color: paleta.branco },
    bannerArtista: { fontSize: 14, fontWeight: '700', color: paleta.branco },
    bannerImg: { width: 150, height: '100%', alignSelf: 'flex-end' },

    generos: { paddingHorizontal: 16, gap: 12 },
    genero: { width: 100 },
    generoImg: { width: 100, height: 100, borderRadius: 6, backgroundColor: paleta.superficie, marginBottom: 6 },
    generoNome: { fontSize: 12, fontWeight: '800', color: paleta.texto },

    estado: { height: 220 },
});