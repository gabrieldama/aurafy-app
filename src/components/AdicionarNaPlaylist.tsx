import { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { paleta } from '@/constants/paleta';
import { listarPlaylists, Musica, Playlist } from '@/services/aurafy';
import { Estado } from '@/components/Estado';

type Props = { visivel: boolean; musica?: Musica; onFechar: () => void };

export function AdicionarNaPlaylist({ visivel, musica, onFechar }: Props) {
    const insets = useSafeAreaInsets();
    const [lista, setLista] = useState<Playlist[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [falha, setFalha] = useState(false);

    useEffect(() => {
        if (!visivel) return;
        setCarregando(true);
        setFalha(false);
        listarPlaylists()
            .then(setLista)
            .catch((e) => {
                console.error('Falha ao obter playlists:', e);
                setFalha(true);
            })
            .finally(() => setCarregando(false));
    }, [visivel]);

    const adicionar = (p: Playlist) => {
        console.log(`Adicionar "${musica?.titulo}" na playlist "${p.nome}"`);
        onFechar();
    };

    const corpo = () => {
        if (carregando) return <Estado carregando mensagem="Carregando playlists..." />;
        if (falha) return <Estado erro mensagem="Não foi possível carregar as playlists." />;
        return (
            <FlatList
                data={lista}
                keyExtractor={(p) => String(p.id)}
                ListEmptyComponent={<Estado mensagem="Nenhuma playlist criada ainda." />}
                renderItem={({ item }) => (
                    <Pressable style={({ pressed }) => [s.linha, pressed && { opacity: 0.7 }]} onPress={() => adicionar(item)}>
                        <Image source={{ uri: item.capaUrl }} style={s.capa} />
                        <View style={s.textos}>
                            <Text style={s.nome} numberOfLines={1}>{item.nome}</Text>
                            <Text style={s.info}>{item.musicas.length} músicas</Text>
                        </View>
                        <Ionicons name="add" size={28} color={paleta.texto} />
                    </Pressable>
                )}
            />
        );
    };

    return (
        <Modal visible={visivel} transparent animationType="slide" statusBarTranslucent onRequestClose={onFechar}>
            <View style={s.fundo}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onFechar} />
                <View style={[s.folha, { paddingBottom: insets.bottom + 16 }]}>
                    <View style={s.alca} />
                    <Text style={s.titulo}>Selecione uma playlist para adicionar essa música</Text>
                    <View style={s.corpo}>{corpo()}</View>
                </View>
            </View>
        </Modal>
    );
}

const s = StyleSheet.create({
    fundo: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.55)' },
    folha: {
        height: '55%',
        backgroundColor: paleta.superficie,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 10,
    },
    alca: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: paleta.bordaForte, marginBottom: 18 },
    titulo: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 26,
        color: paleta.texto,
        textAlign: 'center',
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    corpo: { flex: 1 },
    linha: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20 },
    capa: { width: 48, height: 48, borderRadius: 2, marginRight: 14, backgroundColor: paleta.chip },
    textos: { flex: 1 },
    nome: { fontSize: 15, fontWeight: '600', color: paleta.texto, marginBottom: 2 },
    info: { fontSize: 13, color: paleta.textoApagado },
});