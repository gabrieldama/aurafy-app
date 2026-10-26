import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { paleta } from '@/constants/paleta';
import { Playlist } from '@/services/aurafy';

export function CartaoPlaylist({ playlist, onPress }: { playlist: Playlist; onPress: () => void }) {
  return (
    <Pressable style={({ pressed }) => [s.linha, pressed && { opacity: 0.7 }]} onPress={onPress}>
      <Image source={{ uri: playlist.capaUrl }} style={s.capa} />
      <View style={s.corpo}>
        <Text style={s.titulo}>{playlist.nome}</Text>
        <Text style={s.info}>{playlist.descricao}</Text>
        <Text style={s.tag}>{playlist.musicas.length} músicas</Text>
      </View>
      <Text style={s.seta}>›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: paleta.fundo,
    borderBottomWidth: 1,
    borderBottomColor: paleta.borda,
  },
  capa: { width: 90, height: 90, marginRight: 16, borderRadius: 2, backgroundColor: paleta.superficie },
  corpo: { flex: 1, justifyContent: 'center' },
  titulo: { fontSize: 18, fontWeight: '800', color: paleta.texto, marginBottom: 4 },
  info: { fontSize: 14, fontWeight: '500', color: paleta.textoApagado, marginBottom: 8 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: paleta.chip,
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: '500',
    color: paleta.textoMedio,
    overflow: 'hidden',
  },
  seta: { marginLeft: 8, fontSize: 22, color: paleta.texto },
});
