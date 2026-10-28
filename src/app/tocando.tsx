import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { paleta } from '@/constants/paleta';
import { buscarPlaylist, formatarDuracao, listarMusicas, Musica } from '@/services/aurafy';
import { AdicionarNaPlaylist } from '@/components/AdicionarNaPlaylist';
import { Estado } from '@/components/Estado';

export default function Tocando() {
    const { id, playlistId } = useLocalSearchParams<{ id: string; playlistId?: string }>();
    const insets = useSafeAreaInsets();

    const [fila, setFila] = useState<Musica[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [falha, setFalha] = useState<string | null>(null);
    const [tocando, setTocando] = useState(true);
    const [segundos, setSegundos] = useState(0);
    const [aleatorio, setAleatorio] = useState(false);
    const [repetir, setRepetir] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);

    const carregar = useCallback(() => {
        setCarregando(true);
        setFalha(null);
        const origem = playlistId ? buscarPlaylist(playlistId).then((p) => p.musicas) : listarMusicas();
        return origem
            .then(setFila)
            .catch((e) => {
                console.error('Falha ao obter músicas:', e);
                setFalha('Não foi possível carregar a música. Verifique se a API está rodando.');
            })
            .finally(() => setCarregando(false));
    }, [playlistId]);

    useEffect(() => {
        carregar();
    }, [carregar]);

    const indice = fila.findIndex((m) => String(m.id) === id);
    const musica = indice >= 0 ? fila[indice] : undefined;
    const duracao = musica?.duracaoSegundos ?? 0;
    const progresso = duracao > 0 ? Math.min(segundos / duracao, 1) : 0;

    const irPara = (delta: number) => {
        if (fila.length === 0) return;
        let novo = (indice + delta + fila.length) % fila.length;
        if (aleatorio && fila.length > 1) {
            do {
                novo = Math.floor(Math.random() * fila.length);
            } while (novo === indice);
        }
        router.setParams({ id: String(fila[novo].id) });
    };


    useEffect(() => {
        setSegundos(0);
    }, [id]);


    useEffect(() => {
        if (!tocando || !musica) return;
        const t = setInterval(() => setSegundos((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, [tocando, musica?.id]);


    useEffect(() => {
        if (!musica || duracao === 0 || segundos < duracao) return;
        if (repetir) setSegundos(0);
        else if (fila.length > 1) irPara(1);
        else {
            setTocando(false);
            setSegundos(0);
        }
    }, [segundos]);

    const voltar = () => (router.canGoBack() ? router.back() : router.replace('/playlists'));

    const corpo = () => {
        if (carregando) return <Estado carregando mensagem="Carregando música..." />;
        if (falha) return <Estado erro mensagem={falha} aoTentar={carregar} />;
        if (!musica) return <Estado mensagem="Música não encontrada." />;

        return (
            <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
                <View style={s.capaBox}>
                    <Image source={{ uri: musica.capaUrl }} style={s.capa} />
                </View>

                <View style={s.info}>
                    <Text style={s.titulo} numberOfLines={1}>{musica.titulo}</Text>
                    <Text style={s.artista} numberOfLines={1}>{musica.artista}</Text>
                </View>

                <View style={s.progresso}>
                    <View style={s.barra}>
                        <View style={[s.barraCheia, { width: `${progresso * 100}%` }]} />
                        <View style={[s.bolinha, { left: `${progresso * 100}%` }]} />
                    </View>
                    <View style={s.tempos}>
                        <Text style={s.tempo}>{formatarDuracao(Math.min(segundos, duracao))}</Text>
                        <Text style={s.tempo}>{formatarDuracao(duracao)}</Text>
                    </View>
                </View>

                <View style={s.controles}>
                    <Pressable hitSlop={10} onPress={() => setAleatorio((v) => !v)}>
                        <Ionicons name="shuffle" size={26} color={aleatorio ? paleta.destaque : paleta.texto} />
                    </Pressable>
                    <Pressable hitSlop={10} onPress={() => irPara(-1)}>
                        <Ionicons name="play-skip-back" size={30} color={paleta.texto} />
                    </Pressable>
                    <Pressable style={s.principal} onPress={() => setTocando((v) => !v)}>
                        <Ionicons
                            name={tocando ? 'pause' : 'play'}
                            size={34}
                            color={paleta.texto}
                            style={tocando ? undefined : { marginLeft: 4 }}
                        />
                    </Pressable>
                    <Pressable hitSlop={10} onPress={() => irPara(1)}>
                        <Ionicons name="play-skip-forward" size={30} color={paleta.texto} />
                    </Pressable>
                    <Pressable hitSlop={10} onPress={() => setRepetir((v) => !v)}>
                        <Ionicons name="repeat" size={26} color={repetir ? paleta.destaque : paleta.texto} />
                    </Pressable>
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={s.tela}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={[paleta.destaque, paleta.fundo]} style={s.gradiente} />

            <View style={[s.cabecalho, { paddingTop: insets.top + 20 }]}>
                <Pressable hitSlop={8} onPress={voltar} style={s.lado}>
                    <Ionicons name="chevron-back" size={28} color={paleta.texto} />
                </Pressable>
                <Text style={s.cabecalhoTitulo}>Tocando Agora</Text>
                <Pressable hitSlop={8} onPress={() => musica && setMenuAberto(true)} style={[s.lado, { alignItems: 'flex-end' }]}>
                    <Ionicons name="add" size={30} color={paleta.texto} />
                </Pressable>
            </View>

            {corpo()}

            <AdicionarNaPlaylist visivel={menuAberto} musica={musica} onFechar={() => setMenuAberto(false)} />
        </View>
    );
}

const s = StyleSheet.create({
    tela: { flex: 1, backgroundColor: paleta.fundo },
    gradiente: { position: 'absolute', top: 0, left: 0, right: 0, height: 380 },

    cabecalho: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12 },
    lado: { width: 44 },
    cabecalhoTitulo: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '500', color: paleta.texto },

    capaBox: { alignItems: 'center', marginTop: 28, paddingHorizontal: 24 },
    capa: { width: '100%', maxWidth: 380, aspectRatio: 1, borderRadius: 12, backgroundColor: paleta.superficie },

    info: { paddingHorizontal: 24, marginTop: 28 },
    titulo: { fontSize: 22, fontWeight: '700', color: paleta.texto, marginBottom: 4 },
    artista: { fontSize: 16, color: paleta.textoSuave },

    progresso: { paddingHorizontal: 24, marginTop: 24 },
    barra: { height: 4, borderRadius: 2, backgroundColor: paleta.bordaForte, justifyContent: 'center' },
    barraCheia: { height: 4, borderRadius: 2, backgroundColor: paleta.texto },
    bolinha: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: -6,
        backgroundColor: paleta.texto,
    },
    tempos: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    tempo: { fontSize: 12, color: paleta.textoSuave },

    controles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginTop: 32,
    },
    principal: {
        width: 84,
        height: 84,
        borderRadius: 42,
        borderWidth: 2,
        borderColor: paleta.destaque,
        backgroundColor: paleta.fundo,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: paleta.destaque,
        shadowOpacity: 0.8,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 0 },
        elevation: 12,
    },
});