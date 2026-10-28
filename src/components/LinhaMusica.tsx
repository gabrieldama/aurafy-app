import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { paleta } from '@/constants/paleta';
import { Musica } from '@/services/aurafy';
import { router } from 'expo-router';

export function LinhaMusica({ musica }: { musica: Musica }) {
  const [curtida, setCurtida] = useState(false);

  return (
    <View style={s.linha}>
      <Image source={{ uri: musica.capaUrl }} style={s.capa} />
      <View style={s.corpo}>
        <Text style={s.titulo} numberOfLines={1}>{musica.titulo}</Text>
        <Text style={s.artista} numberOfLines={1}>{musica.artista}</Text>
      </View>

      <Pressable hitSlop={8} onPress={() => setCurtida((c) => !c)}>
        <Ionicons
          name={curtida ? 'heart' : 'heart-outline'}
          size={26}
          color={curtida ? paleta.destaque : paleta.texto}
        />
      </Pressable>

      <Pressable
        style={({ pressed }) => [s.play, pressed && { opacity: 0.7 }]}
        onPress={() => router.push({ pathname: '/tocando', params: { id: String(musica.id) } })}
      >
        <Ionicons name="play" size={16} color={paleta.textoSuave} />
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16 },
  capa: { width: 56, height: 56, marginRight: 16, borderRadius: 2, backgroundColor: paleta.superficie },
  corpo: { flex: 1, justifyContent: 'center', marginRight: 12 },
  titulo: { fontSize: 16, fontWeight: '600', color: paleta.texto, marginBottom: 2 },
  artista: { fontSize: 14, color: paleta.textoApagado },
  play: {
    width: 34,
    height: 34,
    marginLeft: 14,
    borderRadius: 17,
    backgroundColor: paleta.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
});