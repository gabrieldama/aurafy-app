import { Image, StyleSheet, Text, View } from 'react-native';
import { paleta } from '@/constants/paleta';
import { formatarDuracao, Musica } from '@/services/aurafy';

export function CartaoMusica({ musica }: { musica: Musica }) {
  return (
    <View style={s.linha}>
      <Image source={{ uri: musica.capaUrl }} style={s.capa} />
      <View style={s.corpo}>
        <Text style={s.titulo}>{musica.titulo}</Text>
        <Text style={s.info}>{musica.artista}</Text>
      </View>
      <Text style={s.duracao}>{formatarDuracao(musica.duracaoSegundos)}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: paleta.fundo,
    borderBottomWidth: 1,
    borderBottomColor: paleta.borda,
  },
  capa: { width: 56, height: 56, marginRight: 16, borderRadius: 2, backgroundColor: paleta.superficie },
  corpo: { flex: 1, justifyContent: 'center' },
  titulo: { fontSize: 17, fontWeight: '700', color: paleta.texto, marginBottom: 2 },
  info: { fontSize: 14, fontWeight: '500', color: paleta.textoApagado },
  duracao: { marginLeft: 8, fontSize: 14, color: paleta.textoSuave },
});
